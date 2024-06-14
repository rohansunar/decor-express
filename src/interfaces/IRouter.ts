export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    PATCH = 'patch'
}

export type ValidUrlFormat = string | RegExp;

export interface IRouteParams {
    url: ValidUrlFormat;
    httpMethod: HttpMethod;
    middleware?: any;
    controllerAction: any;
}
