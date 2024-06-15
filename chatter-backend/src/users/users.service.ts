import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersResository } from './users.repository';

import { comparePasswords, hashPassword } from './utils/password';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersResository) {}

  async create(createUserInput: CreateUserInput) {
    try {
      return await this.usersRepository.create({
        ...createUserInput,
        password: await hashPassword(createUserInput.password),
      });
    } catch (error) {
      if (error.message.includes('E11000')) {
        throw new UnprocessableEntityException('Email already used');
      }
    }
  }

  async findAll() {
    return await this.usersRepository.find({});
  }

  async findOne(_id: string) {
    return await this.usersRepository.findOne({ _id });
  }

  async update(_id: string, updateUserInput: UpdateUserInput) {
    if (updateUserInput.password) {
      updateUserInput.password = await hashPassword(updateUserInput.password);
    }
    return await this.usersRepository.findOneUpdate(
      { _id },
      {
        ...updateUserInput,
      },
    );
  }

  remove(_id: string) {
    return this.usersRepository.findOneDelete({ _id });
  }

  async verfiyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    if (!user) throw new NotFoundException('Email not used in');
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Password not valid');

    return user;
  }
}
