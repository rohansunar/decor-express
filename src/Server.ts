import 'reflect-metadata';
import express from 'express';
import { IServerConfiguration, IErrorParams } from './interfaces';
import { corsHandler } from './middleware/corsHandlers';
import { declareHandler } from './middleware/declareHandler';
import { AppRouter } from './AppRouter';

export const app = express();
/**
 * Class to create Node server
 *
 * Create a file and paste
 * ```
 * import { Server } from "@rohan/express";
 * export = Server.create({...});
 * ```
 */
export class Server {
    app: express.Express;

    constructor() {
        this.app = express();
    }

    setEssentialMiddlewares(): void {
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(declareHandler);
        app.use(corsHandler);
    }

    /**
     * Static method to create server
     */
    public static create(options: IServerConfiguration) {
        const server = new Server();
        server.setEssentialMiddlewares();
        if (options.beforeRouteInjection) {
            options.beforeRouteInjection(server.app);
        }
        server.mountRouter();
        if (options.afterRouteInjection) {
            options.afterRouteInjection(server.app);
        }
        server.setErrorMiddlewares();
        return server.app;
    }

    mountRouter() {
        AppRouter.forEach((item) => {
            /// this equal to
            /// app.use('/users', requires('./users.routes.js'));
            /// where ./users.routes.js declares all sub-route for /users
            this.app.use(item.baseURL, item.routerObject);
        });
    }

    /**
     * Set error middleware
     */
    setErrorMiddlewares() {
        this._set404();
        this._set422();
        this._renderErrorMiddleware();
    }

    /**
     * Sets 404 middleware to express
     */
    private _set404() {
        this.app.use((req, res, next) => {
            let error: IErrorParams = {
                message: 'Not Found: Requested service does not exists',
                status: 404
            };
            next(error);
        });
    }
    /**
     * Sets Validation Error thrown from Mongoosejs
     */
    private _set422() {
        this.app.use((err: IErrorParams, req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (err.name === 'ValidationError') {
                err.status = 422;
            }
            next(err);
        });
    }
    /**
     * Renders error
     */
    private _renderErrorMiddleware() {
        this.app.use((err: IErrorParams, req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (!err.status) err.status = 500;
            res.status(err.status as number);
            //@todo Log error
            let error: IErrorParams = {
                status: err.name,
                message: err.message
            };
            if (err.status == 422) {
                error.errors = err.errors;
            }
            res.json(error); //@todo based on request type, if api request return json else html
        });
    }
}
