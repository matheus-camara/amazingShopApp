import { watchProductsSaga } from "./products/productSagas"
import { all } from "redux-saga/effects"

export function* rootSaga() {
    yield all([
        watchProductsSaga()
    ])
}