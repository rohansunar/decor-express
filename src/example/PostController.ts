import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { Controller, Get } from '../decorators';
import { IRouteParams } from '../interfaces';

const middlewareExample: RequestHandler = function (req, res, next) {
    res.locals.hello = "- 'this value has been set from middleware'";
    next();
};

@Controller('/blog', middlewareExample)
export class PostController {
    static children: Array<IRouteParams> = [];

    @Get('/')
    index(req: Request, res: Response) {
        res.json({
            _id: '830493kdiei033-303939kfkdk',
            name: 'User ' + res.locals.hello,
            address: 'Siliguri'
        });
    }

    @Get('/create')
    post(req: Request, res: Response) {
        res.json({
            _id: '830493kdiei033-303939kfkdk',
            name: 'Post Create ' + res.locals.hello,
            address: 'Siliguri'
        });
    }
}
