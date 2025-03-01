import { ObjectType, Field } from '@nestjs/graphql';
import { SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';
import { Message } from '../messages/entities/message.entity';

@ObjectType()
export class Chat extends AbstractEntity {
  @Field({ nullable: true })
  name: string;

  @Field(() => Message, { nullable: true })
  latestMessage?: Message;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
