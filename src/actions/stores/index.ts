import { ProductStoreActions } from "./products"
import { UserStoreActions } from "./users"

export * from "./products"
export * from "./users"

export type StoreActions = ProductStoreActions | UserStoreActions