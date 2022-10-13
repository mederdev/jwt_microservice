import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { TokenService } from 'src/token/token.service';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
	constructor(private tokenService: TokenService,
		@InjectModel(User.name) private userModel: Model<UserDocument>) { }


	async registration(email: string, password: string) {
		const userId = Math.floor(Math.random() * 100);
		const candidate = await this.userModel.findOne({ email, userId })
		if (candidate) {
			throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
		}
		const hashPassword = await bcrypt.hash(password, 3);

		const user = await this.userModel.create({ email, password: hashPassword, userId: userId })
		const userDto = new UserDto(user);
		const tokens = this.tokenService.generateTokens({ ...userDto });
		await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto }
	}

	async login(email, password) {
		const user = await this.userModel.findOne({ email })
		if (!user) {
			throw new Error('Пользователь с таким email не найден')
		}
		const isPassEquals = await bcrypt.compare(password, user.password);
		if (!isPassEquals) {
			throw new Error('Неверный пароль');
		}
		const userDto = new UserDto(user);
		const tokens = this.tokenService.generateTokens({ ...userDto });

		await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user: userDto }
	}


	async refresh(refreshToken) {
		if (!refreshToken) {
			throw new Error("Не авторизован");
		}
		const userData = this.tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await this.tokenService.findToken(refreshToken);
		if (!userData || !tokenFromDb) {
			throw new Error("Unauthorized");
		}
		const user = await this.userModel.findById(userData);
		const userDto = new UserDto(user);
		const tokens = this.tokenService.generateTokens({ ...userDto });

		await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user: userDto }
	}

	async getAllUsers() {
		try {
			const users = await this.userModel.find();
			return users.map((element) => {
				return { userID: element.userId, email: element.email }
			});
		} catch (error) {
			return error.message;
		}

	}
	// async logout(refreshToken) {
	// 	const token = await this.tokenService.removeToken(refreshToken);
	// 	return token;
	// }
}
