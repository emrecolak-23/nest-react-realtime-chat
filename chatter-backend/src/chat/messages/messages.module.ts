import { Module, forwardRef } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { ChatModule } from '../chat.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => ChatModule), UsersModule],
  providers: [MessagesResolver, MessagesService],
})
export class MessagesModule {}
