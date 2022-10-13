import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	password: string;

	constructor(model) {
		this.email = model.email;
		this.id = model._id;
	}
}