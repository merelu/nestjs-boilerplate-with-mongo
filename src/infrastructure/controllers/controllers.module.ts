import { UseCasesProxyModule } from '@infrastructure/usercases-proxy/usecases-proxy.module';
import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';

@Module({
  imports: [UseCasesProxyModule.register()],
  controllers: [UserController],
})
export class ControllersModule {}
