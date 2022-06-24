/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'

@Injectable()
export class TypeGuardService {
  public isString(x: unknown): x is string {
    return typeof x === 'string'
  }
}
