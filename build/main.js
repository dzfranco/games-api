require('source-map-support/register');
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/api/controllers/game/controller.ts":
/*!***************************************************!*\
  !*** ./server/api/controllers/game/controller.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_express_utils_1 = __webpack_require__(/*! inversify-express-utils */ "inversify-express-utils");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const identifiers_1 = __webpack_require__(/*! ../../../common/identifiers */ "./server/common/identifiers.ts");
let GameController = class GameController extends inversify_express_utils_1.BaseHttpController {
    constructor($gameService) {
        super();
        this.gameService = $gameService;
    }
    async test(req, res, next) {
        const games = this.gameService.getGames('1', 1);
        return res.send(games);
    }
};
__decorate([
    inversify_express_utils_1.httpGet(''),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()), __param(2, inversify_express_utils_1.next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "test", null);
GameController = __decorate([
    inversify_express_utils_1.controller('/game'),
    __param(0, inversify_1.inject(identifiers_1.Identifiers.GAME_SERVICE_IDENTIFIER)),
    __metadata("design:paramtypes", [Object])
], GameController);
exports.default = GameController;


/***/ }),

/***/ "./server/api/middleware/express-error-handling.ts":
/*!*********************************************************!*\
  !*** ./server/api/middleware/express-error-handling.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = (err, req, res, next) => {
    res.status(err.statusCode).send(err.body);
    return next();
};


/***/ }),

/***/ "./server/api/persistence/game.persistence.ts":
/*!****************************************************!*\
  !*** ./server/api/persistence/game.persistence.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const game_1 = __webpack_require__(/*! ../../common/models/game/game */ "./server/common/models/game/game.ts");
let GamePersistence = class GamePersistence {
    constructor() {
        const game1 = new game_1.Game();
        game1.$id = 1;
        game1.$price = 39.99;
        game1.$tags = ['shooter'];
        game1.$releaseDate = new Date();
        game1.$publisher = 1;
        game1.$title = 'Red Dead Redemption 2';
        this.games = [game1];
    }
    /**
     * @description Gets the games depending on a cursor
     * @param  {string} cursor
     * @param  {number} limit
     * @return IGame[]
     * @memberof GamePersistence
     */
    getGames(cursor, limit) {
        const cursorIndex = this.games.findIndex(game => game.$id.toString() === cursor);
        if (cursorIndex >= 0) {
            return this.games.slice(cursorIndex, limit);
        }
        return this.games.slice(0, limit);
    }
};
GamePersistence = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], GamePersistence);
exports.GamePersistence = GamePersistence;


/***/ }),

/***/ "./server/api/service/game.service.ts":
/*!********************************************!*\
  !*** ./server/api/service/game.service.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const identifiers_1 = __webpack_require__(/*! ../../common/identifiers */ "./server/common/identifiers.ts");
let GameService = class GameService {
    constructor($gamePersistence) {
        this.gamePersistence = $gamePersistence;
    }
    /**
     * @description Gets the games from the database. This method should handle business logic.
     * @return IGame[]
     * @memberof GameService
     */
    getGames(cursor, limit) {
        try {
            const games = this.gamePersistence.getGames('1', 1);
            return games;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
GameService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(identifiers_1.Identifiers.GAME_PERSISTENCE_IDENTIFIER)),
    __metadata("design:paramtypes", [Object])
], GameService);
exports.GameService = GameService;


/***/ }),

/***/ "./server/common/config/environment.ts":
/*!*********************************************!*\
  !*** ./server/common/config/environment.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __webpack_require__(/*! dotenv */ "dotenv");
exports.configureEnv = () => {
    console.log(`Configuring environment: ${"development"}`);
    dotenv_1.config({ path: `.${"development"}.env` });
};


/***/ }),

/***/ "./server/common/config/ioc_config.ts":
/*!********************************************!*\
  !*** ./server/common/config/ioc_config.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
__webpack_require__(/*! ../../api/controllers/game/controller */ "./server/api/controllers/game/controller.ts");
const identifiers_1 = __webpack_require__(/*! ../identifiers */ "./server/common/identifiers.ts");
const game_persistence_1 = __webpack_require__(/*! ../../api/persistence/game.persistence */ "./server/api/persistence/game.persistence.ts");
const game_service_1 = __webpack_require__(/*! ../../api/service/game.service */ "./server/api/service/game.service.ts");
/**
 * @description Inversion of Control Container
 *
 * This will be a signleton that sets up Inversify's container bindings
 */
class IOCContainer {
    get $container() {
        return this.container;
    }
    set $container(container) {
        this.container = container;
    }
    static getInstance() {
        if (!IOCContainer.instance) {
            IOCContainer.instance = new IOCContainer();
            const container = new inversify_1.Container();
            // Inject persistence
            container
                .bind(identifiers_1.Identifiers.GAME_PERSISTENCE_IDENTIFIER)
                .to(game_persistence_1.GamePersistence)
                .inSingletonScope();
            // Inject Service
            container
                .bind(identifiers_1.Identifiers.GAME_SERVICE_IDENTIFIER)
                .to(game_service_1.GameService)
                .inSingletonScope();
            IOCContainer.instance.container = container;
        }
        return IOCContainer.instance;
    }
}
exports.IOCContainer = IOCContainer;


/***/ }),

/***/ "./server/common/identifiers.ts":
/*!**************************************!*\
  !*** ./server/common/identifiers.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Identifiers {
}
exports.Identifiers = Identifiers;
Identifiers.GAME_SERVICE_IDENTIFIER = Symbol.for('game_service');
Identifiers.GAME_PERSISTENCE_IDENTIFIER = Symbol.for('game_persistence');


/***/ }),

/***/ "./server/common/models/game/game.ts":
/*!*******************************************!*\
  !*** ./server/common/models/game/game.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Game {
    /**
     * Getter $id
     * @return {number}
     */
    get $id() {
        return this.id;
    }
    /**
     * Getter $title
     * @return {string}
     */
    get $title() {
        return this.title;
    }
    /**
     * Getter $price
     * @return {number}
     */
    get $price() {
        return this.price;
    }
    /**
     * Getter $publisher
     * @return {string}
     */
    get $publisher() {
        return this.publisher;
    }
    /**
     * Getter $tags
     * @return {string[]}
     */
    get $tags() {
        return this.tags;
    }
    /**
     * Getter $releaseDate
     * @return {Date}
     */
    get $releaseDate() {
        return this.releaseDate;
    }
    /**
     * Setter $id
     * @param {number} value
     */
    set $id(value) {
        this.id = value;
    }
    /**
     * Setter $title
     * @param {string} value
     */
    set $title(value) {
        this.title = value;
    }
    /**
     * Setter $price
     * @param {number} value
     */
    set $price(value) {
        this.price = value;
    }
    /**
     * Setter $publisher
     * @param {string} value
     */
    set $publisher(value) {
        this.publisher = value;
    }
    /**
     * Setter $tags
     * @param {string[]} value
     */
    set $tags(value) {
        this.tags = value;
    }
    /**
     * Setter $releaseDate
     * @param {Date} value
     */
    set $releaseDate(value) {
        this.releaseDate = value;
    }
}
exports.Game = Game;


/***/ }),

/***/ "./server/common/server.ts":
/*!*********************************!*\
  !*** ./server/common/server.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(/*! express */ "express");
const partialResponse = __webpack_require__(/*! express-partial-response */ "express-partial-response");
const path = __webpack_require__(/*! path */ "path");
const ioc_config_1 = __webpack_require__(/*! ./config/ioc_config */ "./server/common/config/ioc_config.ts");
const inversify_express_utils_1 = __webpack_require__(/*! inversify-express-utils */ "inversify-express-utils");
const express_error_handling_1 = __webpack_require__(/*! ../api/middleware/express-error-handling */ "./server/api/middleware/express-error-handling.ts");
const responseTime = __webpack_require__(/*! response-time */ "response-time");
/**
 * Node Express Server setup and configuration
 */
class Server {
    constructor() {
        this.getServer = () => {
            return this.server;
        };
        let root;
        // Setup application root
        root =  true ? path.normalize(__dirname + '/../..') : undefined;
        const container = ioc_config_1.IOCContainer.getInstance().$container;
        this.server = new inversify_express_utils_1.InversifyExpressServer(container, undefined, {
            rootPath: '/api',
        });
        this.server.setConfig(app => {
            app.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                next();
            });
            // Add public folder
            app.use(express.static(`${root}/public`));
            // Add response time support
            // This will add x-response-time to the response headers
            app.use(responseTime({ suffix: false }));
            // Add partial response support
            app.use(partialResponse());
            app.use(express_error_handling_1.errorHandlerMiddleware);
        });
    }
}
exports.default = Server;

/* WEBPACK VAR INJECTION */}.call(this, "server/common"))

/***/ }),

/***/ "./server/index.ts":
/*!*************************!*\
  !*** ./server/index.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __webpack_require__(/*! ./common/server */ "./server/common/server.ts");
const environment_1 = __webpack_require__(/*! ./common/config/environment */ "./server/common/config/environment.ts");
environment_1.configureEnv();
const app = new server_1.default().getServer().build();
app.listen(process.env.APP_PORT);
console.log(`Running in ${process.env.APP_PORT}`);


/***/ }),

/***/ 0:
/*!*******************************!*\
  !*** multi ./server/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./server/index.ts */"./server/index.ts");


/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-partial-response":
/*!*******************************************!*\
  !*** external "express-partial-response" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-partial-response");

/***/ }),

/***/ "inversify":
/*!****************************!*\
  !*** external "inversify" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("inversify");

/***/ }),

/***/ "inversify-express-utils":
/*!******************************************!*\
  !*** external "inversify-express-utils" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("inversify-express-utils");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),

/***/ "response-time":
/*!********************************!*\
  !*** external "response-time" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("response-time");

/***/ })

/******/ });
//# sourceMappingURL=main.map