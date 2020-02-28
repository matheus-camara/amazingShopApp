import { IAction } from "../../actions"
import { Product } from "../../domain"
import { WebService } from "../../services"
import { put, all, takeLatest } from "redux-saga/effects"
import { ProductStoreActions } from "../../actions/stores/products"
import { ProductSagaActions } from "../../actions/sagas/products"

function* getProductsSaga(action: IAction<Product[]>) {
    try {
        const webService = new WebService({ baseUrl: "product" })
        const response = yield webService.getPaged<Product>(action.pagination?.skip, action?.pagination?.take)

        yield put({
            type: ProductStoreActions.GetAll,
            payload: response.result,
            pagination: {
                total: response.total
            }
        })

    } catch(error) {
        throw error
    }
}

function* watchGetProductsSaga() {
    yield takeLatest(ProductSagaActions.GetAll, getProductsSaga)
}

function* addProductsSaga(action: IAction<Product>) {
    try {
        const webService = new WebService({ baseUrl: "product" })
        yield webService.save(action.payload)
    } catch (error) {
        throw error
    }
}

function* watchAddProductsSaga() {
    yield takeLatest(ProductSagaActions.Add, addProductsSaga)
}

export function* watchProductsSaga() {
    yield all([
        watchGetProductsSaga(),
        watchAddProductsSaga()
    ])
}