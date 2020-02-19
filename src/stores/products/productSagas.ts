import React from "react"
import { ProductActions } from ".."
import { Action, PagedAction } from "../action"
import { Product } from "../../domain"
import { useWebService } from "../../services"

const webService = useWebService("api/product", "")

const getProducts = async (skip?: number, take?: number) => {
    return await webService.getPaged<Product>(skip, take)
}

const ProductSaga = async (action: PagedAction<Product | Product[]> | Action<Product | Product[]>, dispatch: React.Dispatch<Action<Product | Product[]>>) => {
    switch (action.type) {
        case ProductActions.GetAll:
            const pagedAction = action as PagedAction<Product | Product[]>
            const { result, total } = await getProducts(pagedAction.skip, pagedAction.take)
            pagedAction.payload = result
            pagedAction.total = total
            dispatch(action)
            break

        case ProductActions.Add:
            await webService.save(action.payload)
            break

        default:
            dispatch(action)
            break
    }
}