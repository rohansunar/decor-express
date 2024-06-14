import { HttpMethod, IRouteParams, ValidUrlFormat } from '../interfaces';

/**
 * Create Route Endpoint Object and
 * set to Endpoints
 *
 * @param httpMethod - http method names 'get', 'post' or any other valid names
 * @param url - string
 */
export function routeSetter(httpMethod: HttpMethod, url: ValidUrlFormat) {
    return (target: any, property: string, descriptor: PropertyDescriptor) => {
        let childRoute: IRouteParams = {
            url,
            httpMethod: httpMethod,
            controllerAction: descriptor.value
        };
        target.constructor.children.push(childRoute);
    };
}
