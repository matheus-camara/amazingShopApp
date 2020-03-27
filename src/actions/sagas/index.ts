import { ProductSagaActions } from "./products"
import { UserSagaActions } from "./users"

export * from "./products"
export * from "./users"

export type SagaActions = ProductSagaActions | UserSagaActions