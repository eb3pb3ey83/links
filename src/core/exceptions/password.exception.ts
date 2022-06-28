import { HttpException, HttpStatus } from '@nestjs/common'

export class PasswordException extends HttpException {
  constructor() {
    super('Email and password do not match.', HttpStatus.BAD_REQUEST)
  }
}
