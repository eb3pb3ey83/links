import { HttpException, HttpStatus } from '@nestjs/common'

export class EmailException extends HttpException {
  constructor() {
    super('Email is taken', HttpStatus.BAD_REQUEST)
  }
}
