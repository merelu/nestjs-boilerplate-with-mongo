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
<<<<<<< HEAD
    contact.name = contactEntity.name;
    contact.email = contactEntity.email;
    contact.company_name = contactEntity.company_name;
    contact.duty = contactEntity.duty;
    contact.project_name = contactEntity.project_name;
    contact.max_budget = contactEntity.max_budget;
    contact.planning_document_url = contactEntity.planning_document_url;
    contact.platform = contactEntity.platform;
    contact.brief_description = contactEntity.brief_description;
=======

    contact.name = contactEntity.name;
    contact.email = contactEntity.email;
    contact.phone = contactEntity.phone;
    contact.company = contactEntity.company;
    contact.etc = contactEntity.etc;

    contact.service_platform = contactEntity.service_platform;
    contact.service_type = contactEntity.service_type;
    contact.project_scale = contactEntity.project_scale;
    contact.design_type = contactEntity.design_type;
    contact.budget_scale = contactEntity.budget_scale;

    contact.develop_period = contactEntity.develop_period;
    contact.contactable_time = contactEntity.contactable_time;
    contact.reservation_date = contactEntity.reservation_date;

>>>>>>> upstream/main
    contact.is_read = contactEntity.is_read;
    contact.created_at = contactEntity.created_at;
    contact.updated_at = contactEntity.updated_at;

    return contact;
  }

  private toContactEntity(contact: ContactM): Contact {
<<<<<<< HEAD
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
=======
    const newContactEntity = new Contact();
    newContactEntity.name = contact.name;
    newContactEntity.email = contact.email;
    newContactEntity.phone = contact.phone;
    newContactEntity.company = contact.company;
    newContactEntity.etc = contact.etc;

    newContactEntity.service_platform = contact.service_platform;
    newContactEntity.service_type = contact.service_type;
    newContactEntity.project_scale = contact.project_scale;
    newContactEntity.design_type = contact.design_type;
    newContactEntity.budget_scale = contact.budget_scale;

    newContactEntity.develop_period = contact.develop_period;
    newContactEntity.contactable_time = contact.contactable_time;
    newContactEntity.reservation_date = contact.reservation_date;
>>>>>>> upstream/main

    return newContactEntity;
  }
}
