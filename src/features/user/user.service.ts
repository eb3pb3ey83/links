import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { CurrentUser, User, UserDocument, UserRequest, USER_MODEL_TOKEN } from 'src/features/user/user.schema'
import { CreateUserDto } from './create-user-dto'
import { nanoid } from 'nanoid'
import { CommonUtility } from 'src/core/utils/common.utility'

@Injectable()
export class UserService {
  constructor(@InjectModel(USER_MODEL_TOKEN) private readonly userModel: Model<UserDocument>) {}
  public save(user: CurrentUser) {
    return user.save()
  }

  public findOne(params: FilterQuery<User>) {
    return this.userModel.findOne(params).exec()
  }

  public find(params: User) {
    return this.userModel.find(params).exec()
  }

  public findOneAndUpdate(request: UserRequest) {
    const { id, name, password, categories } = request

    return this.userModel.findOneAndUpdate({ _id: id }, { name, password, categories }, { new: true }).exec()
  }

  public createUser(user: { [key: string]: any }) {
    const { name, email, password, categories } = user
    const username = nanoid()
    const encryptedPassword = CommonUtility.encryptBySalt(password)

    return this.userModel.create({
      username,
      name,
      email,
      categories,
      password: encryptedPassword,
    })
  }
}
