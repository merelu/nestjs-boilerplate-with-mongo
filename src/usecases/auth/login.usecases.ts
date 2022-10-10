import { IBcryptService } from '@domain/adapters/bcrypt.interface';
import {
  IJwtService,
  IJwtServicePayload,
} from '@domain/adapters/jwt.interface';
import { JwtConfig } from '@domain/config/jwt.interface';
import { ILogger } from '@domain/logger/logger.interface';
import { UserWithoutPassword } from '@domain/model/user';
import { UserRepository } from '@domain/repositories/user.repository.interface';

export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: JwtConfig,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async getJwtToken(userId: string) {
    this.logger.log(
      'LoginUseCases execute',
      `The user ${userId} have been logged.`,
    );
    const payload: IJwtServicePayload = { userId: userId };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);

    return token;
  }

  async getJwtRefreshToken(userId: string) {
    this.logger.log(
      'LoginUseCases execute',
      `The user ${userId} have been logged.`,
    );
    const payload: IJwtServicePayload = { userId: userId };
    const secret = this.jwtConfig.getJwtRefreshSecret();
    const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    await this.setCurrentRefreshToken(token, userId);

    return token;
  }

  async validateUserForLocalStrategy(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    const user = await this.userRepository.getUserById(email);
    if (!user) {
      return null;
    }
    const match = await this.bcryptService.compare(password, user.password);
    if (user && match) {
      await this.updateLoginTime(user.id);
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserForJWTStrategy(userId: string) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      return null;
    }
    return user;
  }

  async updateLoginTime(userId: string) {
    await this.userRepository.updateLastLogin(userId);
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await this.bcryptService.hash(
      refreshToken,
    );
    await this.userRepository.updateRefreshToken(
      userId,
      currentHashedRefreshToken,
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      return null;
    }

    const isRefreshTokenMatching = await this.bcryptService.compare(
      refreshToken,
      user.hashed_refresh_token,
    );
    if (isRefreshTokenMatching) {
      return user;
    }

    return null;
  }
}
