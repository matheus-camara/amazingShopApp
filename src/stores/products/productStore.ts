import React from "react"
import { Product } from "../../domain"
import { Action, PagedAction } from "../action"
import { ProductActions } from "./productActions"

interface IProductStoreState {
    products: Product[],
    total: number
}

const ProductStoreState: IProductStoreState = {
    products: [],
    total: 0
}

const ProductStore = (state: IProductStoreState, action: PagedAction<Product | Product[]> | Action<Product | Product[]>) => {
    switch (action.type) {
        case ProductActions.GetAll:
            const pagedAction = action as PagedAction<Product | Product[]>
            return Object.assign({}, state, {
                products: pagedAction.payload,
                total: pagedAction.total
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

export const useProductStore = (): [IProductStoreState, React.Dispatch<PagedAction<Product | Product[]> | Action<Product | Product[]>>] => {
    const [store, dispatch] = React.useReducer(ProductStore, ProductStoreState)
    return [store, dispatch]
}
