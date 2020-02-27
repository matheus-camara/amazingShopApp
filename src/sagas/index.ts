import { watchProductsSaga } from "./products";
import { all } from "redux-saga/effects";

export function* rootSaga() {
    yield all([
        watchProductsSaga()
    ])
}