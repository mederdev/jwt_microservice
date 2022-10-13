import { IsEmail, IsNotEmpty } from 'class-validator';


export class UserDto {
	id: string;

	@IsEmail()
	email: string;

	@IsNotEmpty()
	password: string;

	constructor(model) {
		this.email = model.email;
		this.id = model._id;
	}
}