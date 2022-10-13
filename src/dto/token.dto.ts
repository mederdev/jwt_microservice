import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
	@ApiProperty()
	@IsNotEmpty()
	refreshToken: string;
}

export default TokenDto;