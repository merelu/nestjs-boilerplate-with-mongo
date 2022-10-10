import { MongooseConfigModule } from '@infrastructure/config/mongoose-config/mongoose-config.module';
import { User, UserSchema } from '@infrastructure/entities/user.entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseUserRepository } from './user.repository';

@Module({
  imports: [
    MongooseConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [DatabaseUserRepository],
  exports: [DatabaseUserRepository],
})
export class RepositoriesModule {}
