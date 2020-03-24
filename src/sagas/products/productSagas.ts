import { IAction } from "../../actions"
import { Product } from "../../domain"
import { WebService } from "../../services"
import { put, all, takeLatest } from "redux-saga/effects"
import { ProductStoreActions } from "../../actions/stores/products"
import { ProductSagaActions } from "../../actions/sagas/products"
import { push } from "connected-react-router"
import { Routes } from "../../constants/routes"

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
        const response: { result: number } = yield webService.save(action.payload)
        yield put(push(Routes.VIEW_PRODUCT_PAGE.replace(":id", response.result.toString())))
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
            yield put(push(Routes.DASHBOARD_PAGE))
        }
    } catch (error) {
    }
}

function* watchDeleteProductSaga() {
    yield takeLatest(ProductSagaActions.Delete, deleteProductSaga)
}

function* editProductSaga(action: IAction<Product>) {
    try {
        if (action.payload && action.payload.id) {
            yield webService.update(action.payload.id, action.payload)
        }
    } catch (error) {

    }
}

function* watchEditProductSaga() {
    yield takeLatest(ProductSagaActions.Edit, editProductSaga)
}

export function* watchProductsSaga() {
    yield all([
        watchGetProductsSaga(),
        watchAddProductsSaga(),
        watchGetSingleProductSaga(),
        watchDeleteProductSaga(),
        watchEditProductSaga(),
    ])
}