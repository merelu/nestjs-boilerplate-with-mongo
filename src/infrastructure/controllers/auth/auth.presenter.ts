import { ApiProperty } from '@nestjs/swagger';

export class IsAuthPresenter {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}
