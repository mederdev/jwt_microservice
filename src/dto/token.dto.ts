import { IsNotEmpty } from 'class-validator';

export class TokenDto {
	@IsNotEmpty()
	refreshToken: string;
}

export default TokenDto;