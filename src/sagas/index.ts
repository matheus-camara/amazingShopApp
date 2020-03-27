import { watchProductsSaga } from "./products/productSagas"
import { all } from "redux-saga/effects"
import { watchUsersSaga } from "./users/UserSagas"

export function* rootSaga() {
    yield all([
        watchProductsSaga(),
        watchUsersSaga()
    ])
}