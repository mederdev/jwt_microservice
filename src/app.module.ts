import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RepostModule } from './repost/repost.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://mederbek:barcelona@cluster0.0scib9d.mongodb.net/?retryWrites=true&w=majority'), ConfigModule.forRoot(), UserModule, TokenModule, RepostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
