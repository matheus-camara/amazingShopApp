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
                total: getTotal(products)
            })

        case ProductStoreActions.RemoveFromCart:
            const newList = [...state.products].filter(x => x.product.id !== action?.payload?.product?.id)
            return Object.assign({}, state, {
                products: newList,
                total: getTotal(newList)

            })

        case ProductStoreActions.RemoveItemFromCart:
            let items = [...state.products]
            const found = items.findIndex(x => x.product.id === action.payload?.product.id)

            if (found >= 0) {
                if (items[found].quantity > 1)
                    items[found].quantity -= 1
                else
                    items = items.filter(x => x.product.id !== action?.payload?.product?.id)
            }

            return Object.assign({}, state, {
                products: items,
                total: getTotal(items)
            })

        default:
            return state
    }
}

const getTotal = (products: IProductCartItem[]) => products
    .map(item => (item?.product?.price ?? 0) * (item?.quantity ?? 0))
    .reduce((previous, current) => previous + current, 0)