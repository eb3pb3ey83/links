import { UserService } from './user.service'
import { UserController } from './user.controller'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserDefinition } from 'src/features/user/user.schema'

@Module({
  imports: [MongooseModule.forFeature([UserDefinition])],
  exports: [MongooseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
