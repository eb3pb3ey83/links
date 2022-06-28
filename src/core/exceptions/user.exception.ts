import { HttpException, HttpStatus } from '@nestjs/common'

export class UserException extends HttpException {
  constructor() {
    super('User with that email does not exist. Please register.', HttpStatus.BAD_REQUEST)
  }
}
