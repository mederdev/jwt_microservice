import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from 'src/schemas/token.schems';
import { TokenService } from './token.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }])],
	providers: [TokenService],
	exports: [TokenService]
})
export class TokenModule {

}
