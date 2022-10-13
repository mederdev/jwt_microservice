import { Body, Controller, Get, Post, Res, Next } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { UserDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) { }

	@Post('/login')
	async registration(@Body() userDto: UserDto, @Res() res: any, @Next() next: NextFunction) {
		try {
			const userData = await this.userService.registration(userDto.email, userDto.password);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	@Post('/signin')
	async login(@Body() userDto: UserDto, req, @Res() res: any, @Next() next: NextFunction) {
		try {
			const userData = await this.userService.login(userDto.email, userDto.password);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	@Get('/all')
	async getUsers(req, @Res() res: Response, @Next() next: NextFunction) {
		const users = await this.userService.getAllUsers();
		return res.json(users);
	}
	// @Post()
	// async logout(req, res, next) {
	// 	try {
	// 		const { refreshToken } = req.cookies;
	// 		const token = await this.userService.logout(refreshToken);
	// 		res.clearCookie('refreshToken');
	// 		return res.json(token);
	// 	} catch (e) {
	// 		next(e);
	// 	}
	// }

	// @Get()
	// async refresh(@Req() req: any, @Res() res: any, @Next() next: NextFunction) {
	// 	try {
	// 		const { refreshToken } = req.cookies;
	// 		const userData = await this.userService.refresh(refreshToken);
	// 		res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
	// 		return res.json(userData);
	// 	} catch (e) {
	// 		next(e);
	// 	}
	// }


}
