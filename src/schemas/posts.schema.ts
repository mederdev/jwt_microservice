import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PostDocument = Posts & Document;

@Schema()
export class Posts {
	@Prop({ required: true, default: 1 })
	postid: number;

	@Prop({ required: true })
	userid: number;

	@Prop({ required: true })
	title: string;

	@Prop()
	description: string;

	@Prop({ default: 0 })
	likes: number

}

export const PostsSchema = SchemaFactory.createForClass(Posts);

