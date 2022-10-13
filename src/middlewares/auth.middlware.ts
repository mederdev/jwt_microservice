import { Injectable, NestMiddleware, Req, Res } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private tokenService: TokenService) { }
	use(@Req() req: any, @Res() res: any, next: NextFunction) {
		try {
			const authorizationHeader = req.headers.authorization;
			if (!authorizationHeader) {
				res.send("Пустой токен")
				return next('Empty token');
			}

			const accessToken = authorizationHeader.split(' ')[1];
			if (!accessToken) {
				res.send("Неккоректный токен")
				return next('Incorrectly token');
			}

			const userData = this.tokenService.validateAccessToken(accessToken);
			if (!userData) {
				res.send("Еще не авторизован")
				return next('Unauthentificated');
			}

			req.user = userData;
			next();
		} catch (e) {
			return next('UnRegister');
		}
	}
}

