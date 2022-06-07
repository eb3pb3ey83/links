import { CategoryController } from './category.controller'
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common'

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [],
})
export class CategoryModule {}
