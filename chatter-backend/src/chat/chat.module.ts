import { Module, forwardRef } from '@nestjs/common';
import { ChatResolver } from './chat.resolver';
import { ChatRepository } from './chat.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { MessagesModule } from './messages/messages.module';

import { ChatDocument, ChatSchema } from './entities/chat.document';
import { ChatService } from './chat.service';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: ChatDocument.name, schema: ChatSchema },
    ]),
    forwardRef(() => MessagesModule),
  ],
  providers: [ChatResolver, ChatRepository, ChatService],
  exports: [ChatRepository],
})
export class ChatModule {}
