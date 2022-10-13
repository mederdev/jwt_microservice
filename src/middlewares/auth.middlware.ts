import { Injectable, NestMiddleware, Req } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private tokenService: TokenService) { }
	use(@Req() req: any, res: Response, next: NextFunction) {
		try {
			const authorizationHeader = req.headers.authorization;
			if (!authorizationHeader) {
				return next('Empty token');
			}

			const accessToken = authorizationHeader.split(' ')[1];
			if (!accessToken) {
				return next('Incorrectly token');
			}

			const userData = this.tokenService.validateAccessToken(accessToken);
			if (!userData) {
				return next('Unauthentificated');
			}

			req.user = userData;
			next();
		} catch (e) {
			return next('UnRegister');
		}
	}
}

