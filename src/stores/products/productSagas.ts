import React from "react"
import { ProductActions } from ".."
import { Action } from "../action"
import { Product } from "../../domain"
import { useWebService } from "../../services"

const webService = useWebService("api/product", "")

const getProducts = async (page?: number) => {
    return await webService.getPaged<Product>();
}

export const ProductSaga = async (action: Action<Product | Product[]>, dispatch: React.Dispatch<Action<Product | Product[]>>) => {
    switch (action.type) {
        case ProductActions.GetAll:
            action.payload = await getProducts()
            dispatch(action)
            break;

        default:
            dispatch(action)
            break;
    }
}