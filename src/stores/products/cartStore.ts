import { Product } from "../../domain"
import { IAction } from "../../actions"
import { ProductStoreActions } from "../../actions/stores/products"

export interface IProductCartItem {
    product: Product,
    quantity: number
}

export interface ICartStoreState {
    products: IProductCartItem[],
    total: number,
}

const CartStoreState: ICartStoreState = {
    products: [],
    total: 0
}

export const CartStore = (state = CartStoreState, action: IAction<IProductCartItem>) => {
    switch (action.type) {
        case ProductStoreActions.AddToCart:
            const products = [...state.products]
            const newProduct = action.payload

            if (!newProduct)
                return state

            const productInCartIndex = state.products.findIndex(p => p.product.id === newProduct.product.id)

            if (productInCartIndex >= 0)
                products[productInCartIndex].quantity += newProduct.quantity
            else
                products.push(newProduct)

            return Object.assign({}, state, {
                products,
                total: products
                    .map(item => (item?.product?.price ?? 0) * (item?.quantity ?? 0))
                    .reduce((previous, current) => previous + current, 0)
            })

        default:
            return state
    }
}