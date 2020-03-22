import { StoreActions } from "./stores"
import { SagaActions } from "./sagas"
import { Action } from "redux"

export interface IAction<T> extends Action<string> {
    pagination?: IPagination
    payload?: T
}

export interface IPagination {
    skip: number
    take: number
    total: number
    currentPage: number
}

export type ActionTypes = StoreActions | SagaActions

export * from "./sagas"
export * from "./stores"