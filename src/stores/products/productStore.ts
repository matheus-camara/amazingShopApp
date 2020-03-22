import { Product } from "../../domain"
import { IAction } from "../../actions"
import { ProductStoreActions } from "../../actions/stores/products"

export interface IProductStoreState {
    products: Product[],
    total: number,
    selected: Product | null,
    currentPage: number
}

const ProductStoreState: IProductStoreState = {
    products: [],
    total: 0,
    selected: null,
    currentPage: 0
}

export const ProductStore = (state = ProductStoreState, action: IAction<Product | Product[]>) => {
    switch (action.type) {
        case ProductStoreActions.GetAll:
            return Object.assign({}, state, {
                products: action.payload,
                total: action.pagination?.total,
                currentPage: action.pagination?.currentPage
            })

        case ProductStoreActions.Get:
            return Object.assign({}, state, {
                selected: action.payload
            })

        case ProductStoreActions.Add:
            return Object.assign({}, state)

        default:
            return state
    }
}