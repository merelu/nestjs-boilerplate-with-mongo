import { ContactM } from '@domain/model/contact';
import { ApiProperty } from '@nestjs/swagger';

export class ContactPresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  company_name: string;

  @ApiProperty()
  duty: string;

  @ApiProperty()
  project_name: string;

  @ApiProperty()
  max_budget: number;

  @ApiProperty()
  planning_document_url: string;

  @ApiProperty()
  platform: number;

  @ApiProperty()
  brief_description: string;

  @ApiProperty()
  created_at: Date;

  constructor(contact: ContactM) {
    this.id = contact.id;
    this.name = contact.name;
    this.mobile = contact.mobile;
    this.email = contact.email;
    this.company_name = contact.company_name;
    this.duty = contact.duty;
    this.project_name = contact.project_name;
    this.max_budget = contact.max_budget;
    this.planning_document_url = contact.planning_document_url;
    this.platform = contact.platform;
    this.brief_description = contact.brief_description;
    this.created_at = contact.created_at;
  }
}
