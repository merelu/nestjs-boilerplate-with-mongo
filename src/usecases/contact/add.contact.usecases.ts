import { IAddContactDto } from '@domain/dto/contact.dto.interface';
import { ILogger } from '@domain/logger/logger.interface';
import { ContactM } from '@domain/model/contact';
import { ContactRepository } from '@domain/repositories/contact.repository.interface';

export class AddContactUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly contactRepository: ContactRepository,
  ) {}

  async execute(data: IAddContactDto) {
    const newContact = new ContactM();
    newContact.name = data.name;
    newContact.mobile = data.mobile;
    newContact.email = data.email;
    newContact.company_name = data.company_name;
    newContact.duty = data.duty;
    newContact.project_name = data.project_name;
    newContact.max_budget = data.max_budget;
    newContact.planning_document_url = data.planning_document_url;
    newContact.platform = data.platform;
    newContact.brief_description = data.brief_description;

    const result = await this.contactRepository.insert(newContact);
    this.logger.log(
      'addContactUseCases execute',
      'New Contact have been inserted',
    );
    return result;
  }
}
