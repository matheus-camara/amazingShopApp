import { WebService } from "./webService"
import { Interceptor } from "./interceptor";

export interface IPagedResult<T> {
    result: T[],
    total: number;
}

export {
    WebService,
    Interceptor
}