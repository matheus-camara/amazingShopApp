import { ProductStore, IProductStoreState } from "./products/productStore"
import { AuthenticationStore, IAuthenticationState } from "./authentications/AuthenticationStore"
import { createStore, combineReducers, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { rootSaga } from "../sagas"

const sagaMiddleware = createSagaMiddleware()

const rootStore = combineReducers({
    product: ProductStore,
    authentication: AuthenticationStore
})

const store = createStore(rootStore,
    applyMiddleware(
        sagaMiddleware
    )
)

sagaMiddleware.run(rootSaga)

export * from "./products/productStore"
export * from "./authentications/AuthenticationStore"

export interface IRootState {
    product: IProductStoreState,
    authentication: IAuthenticationState,
}

export {
    store,
}