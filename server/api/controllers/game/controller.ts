import {
	request,
	controller,
	BaseHttpController,
	httpGet,
	response,
	next,
	httpPost,
	httpPut,
	httpDelete,
} from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';
import { IGameService } from '../../interfaces/service/igame.service';
import { inject } from 'inversify';
import { Identifiers } from '../../../common/identifiers';
import { makeValidateBody } from 'express-class-validator';
import { IGame } from '../../../common/models/game/igame';
import { checkSchema, check } from 'express-validator';
import { UpdateGameValidation, CreateGameValidation, GameListValidation } from '../../validation/game';
import { DiscountDTO } from '../../../common/models/game/discount.dto';

@controller('/game')
class GameController extends BaseHttpController {
	private gameService: IGameService;

	constructor(@inject(Identifiers.GAME_SERVICE_IDENTIFIER) $gameService: IGameService) {
		super();
		this.gameService = $gameService;
	}

	@httpGet('', ...checkSchema(GameListValidation))
	public async getGames(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
		const limit = Number.parseInt(req.query.limit, 10);
		const cursor = req.query.cursor ? Number.parseInt(req.query.cursor) : null;
		const games = await this.gameService.getGames(limit, cursor);
		return res.send(games);
	}

	@httpPost('', makeValidateBody(CreateGameValidation))
	public async createGame(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
		try {
			const plainData = req.body as IGame;
			const savedGame = await this.gameService.saveGame(plainData);
			return res.send(savedGame);
		} catch (error) {
			throw error;
		}
	}

	@httpPut('/:id([0-9]{1,6})', makeValidateBody(UpdateGameValidation))
	public async updateGame(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
		try {
			const plainData = req.body as IGame;
			plainData.$id = Number.parseInt(req.params.id);
			const savedGame = await this.gameService.updateGame(plainData);
			return res.send(savedGame);
		} catch (error) {
			throw error;
		}
	}

	@httpDelete('/:id([0-9]{1,6})')
	public async removeGame(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
		const id = Number.parseInt(req.params.id);
		const removedGame = await this.gameService.removeGame(id);
		return removedGame;
	}

	@httpGet('/:id([0-9]{1,6})/publisher')
	public async getPublisher(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
		const id = Number.parseInt(req.params.id);
		const publisher = await this.gameService.getGamePublisher(id);
		return publisher;
	}

	@httpPost('/discount-remove-old')
	public async discountAndRemoveOld(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
		await this.gameService.discountGames();
		await this.gameService.removeOldGames();
		return res.send();
	}
}

export default GameController;
