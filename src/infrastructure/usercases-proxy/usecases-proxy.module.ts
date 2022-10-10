import { EnvironmentConfigModule } from '@infrastructure/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config/environment-config.service';
import { ExceptionsModule } from '@infrastructure/exceptions/exceptions.module';
import { LoggerModule } from '@infrastructure/logger/logger.module';
import { LoggerService } from '@infrastructure/logger/logger.service';
import { RepositoriesModule } from '@infrastructure/repositories/repositories.module';
import { DatabaseUserRepository } from '@infrastructure/repositories/user.repository';
import { BcryptServiceModule } from '@infrastructure/services/bcrypt/bcrypt.module';
import { BcryptService } from '@infrastructure/services/bcrypt/bcrypt.service';
import { JwtServiceModule } from '@infrastructure/services/jwt/jwt.module';
import { JwtTokenService } from '@infrastructure/services/jwt/jwt.service';
import { DynamicModule, Module } from '@nestjs/common';
import { IsAuthenticatedUseCases } from 'src/usecases/auth/is-authenticated.usercases';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { LogoutUseCases } from 'src/usecases/auth/logout.usecases';
import { SignupUseCases } from 'src/usecases/user/signup.usecases';
import { UseCaseProxy } from './usercases-proxy';

@Module({
  imports: [
    LoggerModule,
    JwtServiceModule,
    BcryptServiceModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
  ],
})
export class UseCasesProxyModule {
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';
  static SIGNUP_USECASES_PROXY = 'SignupUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            BcryptService,
          ],
          provide: UseCasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                jwtTokenService,
                config,
                userRepo,
                bcryptService,
              ),
            ),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UseCasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) =>
            new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UseCasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) =>
            new UseCaseProxy(new LogoutUseCases(userRepo)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UseCasesProxyModule.SIGNUP_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new SignupUseCases(logger, userRepo, bcryptService),
            ),
        },
      ],
      exports: [
        UseCasesProxyModule.LOGIN_USECASES_PROXY,
        UseCasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UseCasesProxyModule.LOGOUT_USECASES_PROXY,
        UseCasesProxyModule.SIGNUP_USECASES_PROXY,
      ],
    };
  }
}
