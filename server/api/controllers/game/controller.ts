import { request, controller, BaseHttpController, httpGet, response, next } from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';
import { IGameService } from '../../interfaces/service/igame.service';
import { inject } from 'inversify';
import { Identifiers } from '../../../common/identifiers';
import { NotFoundError } from 'restify-errors';

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
}

export default GameController;
