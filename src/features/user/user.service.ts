import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { CurrentUser, User, UserDocument, UserRequest, USER_MODEL_TOKEN } from 'src/features/user/user.schema'

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
}
