import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersResository } from './users.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserSchema, User } from './entities/user.entity';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersResolver, UsersService, UsersResository],
  exports: [UsersService],
})
export class UsersModule {}
