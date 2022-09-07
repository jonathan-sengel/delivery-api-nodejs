import express from 'express';
import { router } from './routes.js';

export class App {
    constructor() {
        this.server = express();
        this.#middleware();
        this.#router();
    }

    #middleware() {
        this.server.use(express.json());
    }

    #router() {
        this.server.use(router);
    }


}