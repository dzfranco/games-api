import { request, controller, BaseHttpController, httpGet, response, next, httpPost } from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';
import { IGameService } from '../../interfaces/service/igame.service';
import { inject } from 'inversify';
import { Identifiers } from '../../../common/identifiers';
import { makeValidateBody } from 'express-class-validator';
import { CreateGameValidation } from '../../validation/game/create-game';
import { GameDTO } from '../../../common/models/game/game.dto';
import { IGame } from '../../../common/models/game/igame';

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
}

export default GameController;
