import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
// import { UpdateChatInput } from './dto/update-chat.input';
import { ChatRepository } from './chat.repository';
import { PipelineStage } from 'mongoose';
import { Types } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async create(createChatInput: CreateChatInput, userId: string) {
    return this.chatRepository.create({
      ...createChatInput,
      userId,
      messages: [],
    });
  }

  async findMany(prePipelineStages: PipelineStage[] = []) {
    const chats = await this.chatRepository.model.aggregate([
      ...prePipelineStages,
      { $set: { latestMessage: { $arrayElemAt: ['$messages', -1] } } },
      { $unset: 'messages' },
      {
        $lookup: {
          from: 'users',
          localField: 'latestMessage.userId',
          foreignField: '_id',
          as: 'latestMessage.user',
        },
      },
    ]);

    chats.forEach((chat) => {
      if (!chat.latestMessage?._id) {
        delete chat.latestMessage;
        return;
      }
      chat.latestMessage.user = chat.latestMessage.user[0];
      delete chat.latestMessage.userId;
      chat.latestMessage.chatId = chat._id;
    });

    return chats;
  }

  async findOne(_id: string) {
    const chats = await this.chatRepository.model.aggregate([
      { $match: { chatId: new Types.ObjectId(_id) } },
    ]);

    if (!chats[0]) {
      throw new NotFoundException(`No chat was found with ID, ${0}`);
    }

    return chats[0];
  }

  // update(id: number, updateChatInput: UpdateChatInput) {
  //   return `This action updates a #${id} chat`;
  // }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }

  // public userChatFilter(userId: string) {
  //   return {
  //     $or: [
  //       { userId },
  //       {
  //         userIds: {
  //           $in: [userId],
  //         },
  //       },
  //       {
  //         isPrivate: false,
  //       },
  //     ],
  //   };
  // }
}
