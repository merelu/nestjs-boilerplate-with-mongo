import { PlatformEnum } from '@domain/common/enums/platform.enum';

export class ContactM {
  id: string;

  name: string;

  mobile: string;

  email: string;

  company_name: string;

  duty: string;

  project_name: string;

  max_budget: number;

  planning_document_url: string;

  platform: PlatformEnum;

  brief_description: string;

  is_read: boolean;

  created_at: Date;

  updated_at: Date;
}
