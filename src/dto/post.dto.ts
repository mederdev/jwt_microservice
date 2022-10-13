import { ApiProperty } from '@nestjs/swagger';
export class PostDto {
	@ApiProperty()
	title: string;

	@ApiProperty()
	description: string;
}