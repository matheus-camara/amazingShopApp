import { IAction } from "../../actions"
import { Product } from "../../domain"
import { WebService } from "../../services"
import { put, all, takeLatest } from "redux-saga/effects"
import { ProductStoreActions } from "../../actions/stores/products"
import { ProductSagaActions } from "../../actions/sagas/products"

const webService = new WebService({ baseUrl: "product" })

function* getProductsSaga(action: IAction<Product[]>) {
    try {
        const response = yield webService.getPaged<Product>(action.pagination?.skip, action?.pagination?.take)

        yield put({
            type: ProductStoreActions.GetAll,
            payload: response.result,
            pagination: {
                total: response.total,
                currentPage: action.pagination?.currentPage
            }
        })

    } catch (error) {
    }
}

function* watchGetProductsSaga() {
    yield takeLatest(ProductSagaActions.GetAll, getProductsSaga)
}

function* getSingleProductSaga(action: IAction<number>) {
    try {
        const response = yield webService.find<Product>(action.payload ?? 0)

        yield put({
            type: ProductStoreActions.Get,
            payload: response.result,
        })

    } catch (error) {
    }
}

function* watchGetSingleProductSaga() {
    yield takeLatest(ProductSagaActions.GetDetailed, getSingleProductSaga)
}

function* addProductsSaga(action: IAction<Product>) {
    try {
        yield webService.save(action.payload)
    } catch (error) {
    }
}

function* watchAddProductsSaga() {
    yield takeLatest(ProductSagaActions.Add, addProductsSaga)
}

function* deleteProductSaga(action: IAction<number>) {
    try {
        if (action.payload) {
            yield webService.delete(action.payload)
        }
    } catch (error) {
    }
}

function* watchDeleteProductSaga() {
    yield takeLatest(ProductSagaActions.Delete, deleteProductSaga)
}

export function* watchProductsSaga() {
    yield all([
        watchGetProductsSaga(),
        watchAddProductsSaga(),
        watchGetSingleProductSaga(),
        watchDeleteProductSaga()
    ])
}