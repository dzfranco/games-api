import {
	request,
	controller,
	BaseHttpController,
	httpGet,
	response,
	next,
	httpPost,
	httpPut,
} from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';
import { IGameService } from '../../interfaces/service/igame.service';
import { inject } from 'inversify';
import { Identifiers } from '../../../common/identifiers';
import { makeValidateBody } from 'express-class-validator';
import { CreateGameValidation } from '../../validation/game/create-game';
import { IGame } from '../../../common/models/game/igame';
import { UpdateGameValidation } from '../../validation/game/update-game';

@controller('/game')
class GameController extends BaseHttpController {
	private gameService: IGameService;

	constructor(@inject(Identifiers.GAME_SERVICE_IDENTIFIER) $gameService: IGameService) {
		super();
		this.gameService = $gameService;
	}

	@httpGet('')
	public async test(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
		const games = this.gameService.getGames('1', 1);
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

	@httpGet('/:id([0-9]{1,6})/publisher')
	public async getPublisher(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
		const id = Number.parseInt(req.params.id);
		const publisher = await this.gameService.getGamePublisher(id);
		return publisher;
	}
}

export default GameController;
