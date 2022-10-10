import { UserM } from '@domain/model/user';
import { UserRepository } from '@domain/repositories/user.repository.interface';
import { User, UserDocument } from '@infrastructure/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userEntityRepository: Model<UserDocument>,
  ) {}

  async insert(user: UserM, session?: ClientSession): Promise<UserM> {
    const userEntity = this.toUserEntity(user);
    const result = await this.userEntityRepository.create([userEntity], {
      session: session,
    });
    return this.toUser(result[0]);
  }

  async getUserById(userId: string): Promise<UserM> {
    const userEntity = await this.userEntityRepository.findById(userId);
    if (!userEntity) {
      return null;
    }
    return this.toUser(userEntity);
  }

  async getUserByEmail(email: string): Promise<UserM> {
    const userEntity = await this.userEntityRepository.findOne({
      email: email,
    });

    if (!userEntity) {
      return null;
    }
    return this.toUser(userEntity);
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.userEntityRepository.findByIdAndUpdate(userId, {
      $set: { last_login: Date.now() },
    });
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userEntityRepository.findByIdAndUpdate(userId, {
      $set: { hashed_refresh_token: refreshToken },
    });
  }

  async updateDeviceToken(userId: string, deviceToken: string): Promise<void> {
    await this.userEntityRepository.findByIdAndUpdate(userId, {
      $set: { device_token: deviceToken },
    });
  }

  private toUser(userEntity: UserDocument): UserM {
    const user: UserM = new UserM();
    user.id = userEntity._id.toString();
    user.email = userEntity.email;
    user.password = user.password;
    user.created_at = user.created_at;
    user.updated_at = user.updated_at;
    user.last_login = user.last_login;
    user.hashed_refresh_token = user.hashed_refresh_token;

    return user;
  }

  private toUserEntity(user: UserM): User {
    const newUserEntity: User = new User();

    newUserEntity.email = user.email;
    newUserEntity.password = user.password;
    newUserEntity.last_login = user.last_login;

    return newUserEntity;
  }
}
