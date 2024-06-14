// export function Controller(baseRoute: string = '') {
//     return (target: any) => {
//         Reflect.defineMetadata('baseRoute', baseRoute, target);
//     };
// }

import { RequestHandler, Router } from 'express';
import { IRouteParams } from '../interfaces';
import { AppRouter } from '../AppRouter';

export function Controller(rootPath: string, controllerMiddleware?: RequestHandler | Array<RequestHandler>) {
    return (constructor: { children: Array<IRouteParams> }) => {
        let router = Router();
        // Controller Middleware
        // Specific to this controller
        if (controllerMiddleware instanceof Array && controllerMiddleware.length > 0) {
            router.use(controllerMiddleware);
        } else if (controllerMiddleware instanceof Array === false && controllerMiddleware) {
            router.use(controllerMiddleware);
        }
        /// Get all sub routes
        constructor.children.forEach((item) => {
            /// mount sub route.
            /// example app.get('/:id', ROUTE_HANDLER_FN)
            router[item.httpMethod](item.url, item.middleware ? item.middleware : [], item.controllerAction);
        });
        /// Mount mini-app to base route
        /// example app.use('/users', MINI_ROUTE_OBJECT)
        AppRouter.push({
            baseURL: rootPath,
            routerObject: router
        });
    };
}
