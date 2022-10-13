import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CounterDocument = Counter & Document;

@Schema()
export class Counter {
	@Prop({ required: true })
	counterid: string;

	@Prop({ default: 0 })
	value: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
