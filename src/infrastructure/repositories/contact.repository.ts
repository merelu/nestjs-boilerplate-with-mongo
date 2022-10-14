import { ContactM } from '@domain/model/contact';
import { ContactRepository } from '@domain/repositories/contact.repository.interface';
import {
  Contact,
  ContactDocument,
} from '@infrastructure/entities/contact.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseContactRepository implements ContactRepository {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactEntityRepository: Model<ContactDocument>,
  ) {}
  async insert(contact: ContactM): Promise<ContactM> {
    const contactEntity = this.toContactEntity(contact);
    const result = await this.contactEntityRepository.create([contactEntity]);
    return this.toContact(result[0]);
  }
  async findById(contactId: string): Promise<ContactM> {
    const contactEntity = await this.contactEntityRepository.findById(
      contactId,
    );
    if (!contactEntity) {
      return null;
    }
    return this.toContact(contactEntity);
  }

  async findAll(): Promise<ContactM[]> {
    const contacts = await this.contactEntityRepository.find();
    return contacts.map((contact) => this.toContact(contact));
  }

  private toContact(contactEntity: ContactDocument): ContactM {
    const contact: ContactM = new ContactM();
    contact.id = contactEntity._id.toString();
    contact.name = contactEntity.name;
    contact.email = contactEntity.email;
    contact.company_name = contactEntity.company_name;
    contact.duty = contactEntity.duty;
    contact.project_name = contactEntity.project_name;
    contact.max_budget = contactEntity.max_budget;
    contact.planning_document_url = contactEntity.planning_document_url;
    contact.platform = contactEntity.platform;
    contact.brief_description = contactEntity.brief_description;
    contact.is_read = contactEntity.is_read;
    contact.created_at = contactEntity.created_at;
    contact.updated_at = contactEntity.updated_at;

    return contact;
  }

  private toContactEntity(contact: ContactM): Contact {
    const newContactEntity: Contact = new Contact();
    newContactEntity.name = contact.name;
    newContactEntity.email = contact.email;
    newContactEntity.company_name = contact.company_name;
    newContactEntity.duty = contact.duty;
    newContactEntity.project_name = contact.project_name;
    newContactEntity.max_budget = contact.max_budget;
    newContactEntity.planning_document_url = contact.planning_document_url;
    newContactEntity.platform = contact.platform;
    newContactEntity.brief_description = contact.brief_description;
    newContactEntity.email = contact.email;

    return newContactEntity;
  }
}
