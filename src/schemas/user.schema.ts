import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop({ unique: true, required: true })
	email: String;

	@Prop({ required: true })
	password: String;

	@Prop({ required: true, default: 0 })
	userId: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
