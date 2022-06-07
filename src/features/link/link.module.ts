import { LinkController } from './link.controller'
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common'

@Module({
  imports: [],
  controllers: [LinkController],
  providers: [],
})
export class LinkModule {}
