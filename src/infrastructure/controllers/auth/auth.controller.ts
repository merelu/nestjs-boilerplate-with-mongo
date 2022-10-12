import { UserM } from '@domain/model/user';
import { User } from '@infrastructure/common/decorators/user.decorator';
import { LoginGuard } from '@infrastructure/common/guards/login.guard';
import { BaseMetaResponseFormat } from '@infrastructure/common/interceptors/response.interceptor';
import { ApiResponseType } from '@infrastructure/common/swagger/response.decorator';
import { UseCasesProxyModule } from '@infrastructure/usercases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@infrastructure/usercases-proxy/usercases-proxy';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IsAuthenticatedUseCases } from 'src/usecases/auth/is-authenticated.usercases';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { LogoutUseCases } from 'src/usecases/auth/logout.usecases';
import { AuthLoginDto } from './auth.dto';
import { IsAuthPresenter } from './auth.presenter';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsAuthPresenter, BaseMetaResponseFormat)
export class AuthController {
  constructor(
    @Inject(UseCasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUseCasesProxy: UseCaseProxy<LoginUseCases>,
    @Inject(UseCasesProxyModule.LOGOUT_USECASES_PROXY)
    private readonly logoutUseCasesProxy: UseCaseProxy<LogoutUseCases>,
    @Inject(UseCasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
    private readonly isAuthUseCasesProxy: UseCaseProxy<IsAuthenticatedUseCases>,
  ) {}

  @Post('')
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'login' })
  @ApiResponseType(IsAuthPresenter, BaseMetaResponseFormat)
  async login(@User() user: UserM) {
    const accessToken = this.loginUseCasesProxy
      .getInstance()
      .getJwtToken(user.id);

    const refreshToken = await this.loginUseCasesProxy
      .getInstance()
      .getJwtRefreshToken(user.id);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
