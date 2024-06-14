import { HttpMethod, ValidUrlFormat } from '../interfaces';

import { routeSetter } from './routeSetter';

/**
 * Add new route URL on GET request
 *
 * @decorator Get
 */
export function Get(url: ValidUrlFormat) {
    return routeSetter(HttpMethod.GET, url);
}
/**
 * Add new route URL on POST request
 *
 * @decorator
 */
export function Post(url: ValidUrlFormat) {
    return routeSetter(HttpMethod.POST, url);
}
/**
 * Add new route URL on PUT request
 *
 * @decorator
 */
export function Put(url: ValidUrlFormat) {
    return routeSetter(HttpMethod.PUT, url);
}
/**
 * Add new route URL on DELETE request
 *
 * @decorator
 */
export function Delete(url: ValidUrlFormat) {
    return routeSetter(HttpMethod.DELETE, url);
}
/**
 * Add new route URL on PATCH request
 *
 * @decorator
 */
export function Patch(url: ValidUrlFormat) {
    return routeSetter(HttpMethod.PATCH, url);
}
