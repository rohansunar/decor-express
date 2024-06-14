import { RequestHandler } from 'express';
import { IRouteParams } from '../interfaces';

export function Middleware(middleware: RequestHandler) {
    return (target: any, property: string, descriptor: PropertyDescriptor) => {
        const children: Array<IRouteParams> = target.constructor.children;
        const child = children.find((item) => item.controllerAction === descriptor.value);
        if (child) {
            if (child.middleware instanceof Array) {
                child.middleware.push(middleware);
            } else {
                child.middleware = [middleware];
            }
        } else {
            throw new Error(`Invalid Middleware Injection.
            Middleware decorator must be use just above the @Get or similar Route Decorator`);
        }
    };
}
