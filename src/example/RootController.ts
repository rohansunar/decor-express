import { Request, Response } from 'express';
import { Controller, Get, Middleware } from '../decorators';
import { IRouteParams } from '../interfaces';

@Controller('/')
export class RootController {
    static children: Array<IRouteParams> = [];

    @Middleware(function (req, res, next) {
        res.locals.hello = 'Drivio';
        next();
    })
    @Get('/')
    home(req: Request, res: Response) {
        res.json({
            _id: '830493kdiei033-303939kfkdk',
            name: 'Home Page ' + res.locals.hello,
            address: 'Root Controller'
        });
    }
    @Get('/contact')
    contact(req: Request, res: Response) {
        res.json({
            _id: '830493kdiei033-303939DDDDDDD',
            name: 'Contact page ' + res.locals.hello,
            address: 'Root Controller'
        });
    }
}
