import { ProductStore, IProductStoreState } from "./products/productStore"
import { AuthenticationStore, IAuthenticationState } from "./authentications/AuthenticationStore"
import { CartStore, ICartStoreState } from "./products/cartStore"
import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import { rootSaga } from "../sagas"
import { connectRouter, routerMiddleware } from 'connected-react-router'

const sagaMiddleware = createSagaMiddleware()

const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    product: ProductStore,
    cart: CartStore,
    authentication: AuthenticationStore
})

const store = (history: any) => {
    const rootStore = createStore(
        createRootReducer(history), // root reducer with router state
        compose(
            applyMiddleware(
                routerMiddleware(history),
                sagaMiddleware // for dispatching history actions
            ),
        ),
    )

    sagaMiddleware.run(rootSaga)
    return rootStore
}

export * from "./products/productStore"
export * from "./products/cartStore"
export * from "./authentications/AuthenticationStore"

export interface IRootState {
    product: IProductStoreState,
    cart: ICartStoreState,
    authentication: IAuthenticationState,
}

export {
    store,
}