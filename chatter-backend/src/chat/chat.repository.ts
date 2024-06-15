import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { ChatDocument } from './entities/chat.document';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChatRepository extends AbstractRepository<ChatDocument> {
  protected readonly logger = new Logger(ChatRepository.name);

  constructor(
    @InjectModel(ChatDocument.name)
    chatModel: Model<ChatDocument>,
  ) {
    super(chatModel);
  }
}
