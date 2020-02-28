import { ProductStore, IProductStoreState } from "./products/productStore"
import { createStore, combineReducers, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { rootSaga } from "../sagas"

const middleware = createSagaMiddleware()

const rootStore = combineReducers({
    product: ProductStore
})

const store = createStore(rootStore, applyMiddleware(middleware))

middleware.run(rootSaga)

export * from "./products/productStore"

export interface IRootState {
    product: IProductStoreState
}

export {
    store,
}