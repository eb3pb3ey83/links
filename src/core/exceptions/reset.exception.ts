import { HttpException, HttpStatus } from '@nestjs/common'

export class ResetException extends HttpException {
  constructor() {
    super('Password reset failed. Try later.', HttpStatus.BAD_REQUEST)
  }
}
