import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { sign, verify } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { Token, TokenDocument } from 'src/schemas/token.schems';
require('dotenv').config();

@Injectable()
export class TokenService {
	constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>) { }

	generateTokens(payload) {
		const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '100' })
		const refreshToken = sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '100' })
		return {
			accessToken,
			refreshToken
		}
	}

	validateAccessToken(token: string) {
		try {
			const userData = verify(token, process.env.JWT_ACCESS_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = verify(token, process.env.JWT_REFRESH_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}

	async saveToken(userId, refreshToken) {
		const tokenData = await this.tokenModel.findOne({ user: userId })
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		const token = await this.tokenModel.create({ user: userId, refreshToken })
		return token;
	}

	async findToken(refreshToken) {
		const tokenData = await this.tokenModel.findOne({ refreshToken })
		return tokenData;
	}
}
