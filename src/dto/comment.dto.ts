import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
	@ApiProperty()
	postid: number;
	@ApiProperty()
	comment: string;
	@ApiProperty()
	like: boolean;
}