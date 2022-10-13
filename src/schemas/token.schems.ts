import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
	@Prop({ ref: 'User' })
	user: mongoose.Schema.Types.ObjectId;

	@Prop({ required: true })
	refreshToken: String;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
