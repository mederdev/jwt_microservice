import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RepostController } from './repost.controller';
import { AuthMiddleware } from 'src/middlewares/auth.middlware';
import { TokenModule } from 'src/token/token.module';
import { RepostService } from './repost.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostsSchema } from 'src/schemas/posts.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { CommentSchema, Comments } from 'src/schemas/comment.schema';
import { Counter, CounterSchema } from 'src/schemas/counter.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Posts.name, schema: PostsSchema },
  { name: User.name, schema: UserSchema },
  { name: Comments.name, schema: CommentSchema },
  { name: Counter.name, schema: CounterSchema }]), TokenModule],
  controllers: [RepostController],
  providers: [AuthMiddleware, RepostService],
})
export class RepostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/repost/post')
  }
}
