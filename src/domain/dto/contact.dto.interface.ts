import { PlatformEnum } from '@domain/common/enums/platform.enum';

export interface IAddContactDto {
  readonly name: string;

  readonly mobile: string;

  readonly email: string;

  readonly company_name: string;

  readonly duty: string;

  readonly project_name: string;

  readonly max_budget: number;

  readonly planning_document_url: string;

  readonly platform: PlatformEnum;

  readonly brief_description: string;
}
