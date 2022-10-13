import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CommentDocument = Comments & Document;

@Schema()
export class Comments {
	@Prop({ required: true })
	postid: number;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	comment: string
}

export const CommentSchema = SchemaFactory.createForClass(Comments);
