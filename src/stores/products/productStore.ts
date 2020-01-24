import React from "react"
import { Product } from "../../domain"
import { Action } from "../action"
import { ProductActions } from "./productActions"
import { ProductSaga } from "./productSagas"

interface IProductStoreState {
    products: Product[]
}

const ProductStoreState: IProductStoreState = {
    products: []
}

const ProductStore = (state: IProductStoreState, action: Action<Product | Product[]>) => {
    switch (action.type) {
        case ProductActions.GetAll:
            return Object.assign({}, state, {
                products: action.payload
            })

        case ProductActions.Get:
            return Object.assign({}, state, {
                products: [...state.products, action.payload]
            })

        case ProductActions.Add:
            return Object.assign({}, state)

        default:
            return ProductStoreState
    }
}

export const useProductStore = (): [IProductStoreState, (action: Action<Product | Product[]>) => Promise<void>] => {
    const [store, dispatch] = React.useReducer(ProductStore, ProductStoreState)

    return [store, (action: Action<Product | Product[]>) => ProductSaga(action, dispatch)]
}
