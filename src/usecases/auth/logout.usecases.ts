import { UserWithoutPassword } from '@domain/model/user';
import { UserRepository } from '@domain/repositories/user.repository.interface';

export class LogoutUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<UserWithoutPassword> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      return null;
    }
    await this.userRepository.updateRefreshTokenHash(userId, null);
    await this.userRepository.updateDeviceToken(userId, null);
    const { password, ...result } = user;
    return result;
  }
}
