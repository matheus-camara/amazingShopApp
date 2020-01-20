import { Product } from "../../domain";
import { Action } from "../action";

export const ADD_PRODUCT_TYPE = "ADD-PRODUCT";
export const GET_PRODUCTS_TYPE = "GET-PRODUCTS";
export const addProductAction = (product:Product) => new Action<Product>(ADD_PRODUCT_TYPE, product);