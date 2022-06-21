import { UserModule } from './features/user/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LinkModule } from './features/link/link.module'
import { CategoryModule } from './features/category/category.module'
import { AuthModule } from './features/auth/auth.module'
import mongoConfigFactory from './configs/mongo.config'
import awsConfigFactory from './configs/aws.config'
import jwtConfigFactory from './configs/jwt.config'
import emailConfigFactory from './configs/email.config'
import { Module, ValidationPipe } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ResponseInterceptor } from './core/interceptors/response.interceptor'
import { AppController } from './app.controller'

@Module({
  imports: [
    UserModule,
    LinkModule,
    CategoryModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfigFactory, awsConfigFactory, jwtConfigFactory, emailConfigFactory],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('mongo.uri'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
