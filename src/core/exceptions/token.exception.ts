import { HttpException, HttpStatus } from '@nestjs/common'

export class TokenException extends HttpException {
  constructor() {
    super('token error', HttpStatus.BAD_REQUEST)
  }
}
