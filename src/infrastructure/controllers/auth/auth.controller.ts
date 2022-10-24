import { UserM } from '@domain/model/user';
import {
  AuthLogin,
  AuthRefreshJwt,
} from '@infrastructure/common/decorators/auth.decorator';
import { User } from '@infrastructure/common/decorators/user.decorator';
import { BaseMetaResponseFormat } from '@infrastructure/common/interceptors/response.interceptor';
import { ApiResponseType } from '@infrastructure/common/swagger/response.decorator';
import { UseCasesProxyModule } from '@infrastructure/usercases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@infrastructure/usercases-proxy/usercases-proxy';
import { Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { LogoutUseCases } from 'src/usecases/auth/logout.usecases';
import { AuthLoginDto, RefreshTokenDto } from './auth.dto';
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
  ) {}

  @Post('')
  @AuthLogin()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: '로그인(이메일, 비밀번호)' })
  @ApiResponseType(IsAuthPresenter, BaseMetaResponseFormat)
  async login(@User() user: UserM) {
    const accessToken = this.loginUseCasesProxy
      .getInstance()
      .getJwtToken(user.id);

    const refreshToken = await this.loginUseCasesProxy
      .getInstance()
      .getJwtRefreshToken(user.id);

    return {
      data: { access_token: accessToken, refresh_token: refreshToken },
    };
  }

  @Post('refresh')
  @AuthRefreshJwt()
  @ApiBody({ type: RefreshTokenDto })
  @ApiOperation({ description: '토큰 재발급' })
  async refresh(@User() user: UserM) {
    const accessToken = this.loginUseCasesProxy
      .getInstance()
      .getJwtToken(user.id);

    const refreshToken = await this.loginUseCasesProxy
      .getInstance()
      .getJwtRefreshToken(user.id);

    return {
      data: { access_token: accessToken, refresh_token: refreshToken },
    };
  }
}
