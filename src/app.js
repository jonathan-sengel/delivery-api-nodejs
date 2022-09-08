import express from 'express';
import { router } from './routes.js';
import cors from 'cors';

export class App {
    constructor() {
        this.server = express();
        this.#middleware();
        this.#router();
    }

    #middleware() {
        this.server.use(express.json());
        this.server.use(cors({
            origin: '*',
            allowedHeaders: 'Content-Security-Policy'
        }));
    }

    #router() {

        this.server.use(router);
    }


}