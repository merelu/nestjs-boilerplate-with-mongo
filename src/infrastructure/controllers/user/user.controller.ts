import {
  BaseMetaResponseFormat,
  ResponseFormat,
} from '@infrastructure/common/interceptors/response.interceptor';
import { ApiResponseType } from '@infrastructure/common/swagger/response.decorator';
import { UseCasesProxyModule } from '@infrastructure/usercases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@infrastructure/usercases-proxy/usercases-proxy';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupUseCases } from 'src/usecases/user/signup.usecases';
import { SignupDto } from './user.dto';
import { UserPresenter } from './user.presenter';

@Controller('user')
@ApiTags('User')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UseCasesProxyModule.SIGNUP_USECASES_PROXY)
    private readonly signupUsecaseProxy: UseCaseProxy<SignupUseCases>,
  ) {}

  @Post()
  @ApiResponseType(UserPresenter, BaseMetaResponseFormat)
  async signup(@Body() signupDto: SignupDto): Promise<ResponseFormat> {
    const { email, password, device_token } = signupDto;
    const userCreated = await this.signupUsecaseProxy
      .getInstance()
      .execute({ email, password, deviceToken: device_token });

    return { data: new UserPresenter(userCreated), meta: null };
  }
}
