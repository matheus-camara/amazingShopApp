import { IAction } from "../../actions"
import { Product } from "../../domain"
import { WebService } from "../../services"
import { put, all, takeLatest, delay, select } from "redux-saga/effects"
import { ProductStoreActions } from "../../actions/stores/products"
import { ProductSagaActions } from "../../actions/sagas/products"
import { push } from "connected-react-router"
import { Routes } from "../../constants/routes"
import { IRootState } from "../../stores"

const webService = new WebService({ baseUrl: "product" })

function* getProductsSaga(action: IAction<Product[]>) {
    try {
        const token = yield select((x: IRootState) => x.authentication.token)
        debugger
        const response = yield webService.getPaged<Product>({
            skip: action.pagination?.skip ?? 0,
            take: action?.pagination?.take ?? 0,
            token: token,
            queryParams: action.filter
        })

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
        const token = yield select((x: IRootState) => x.authentication.token)
        const response = yield webService.find<Product>(action.payload ?? 0, token)

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
        const token = yield select((x: IRootState) => x.authentication.token)
        const response: { result: number } = yield webService.save(action.payload, token)

        yield delay(100, true)
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
            const token = yield select((x: IRootState) => x.authentication.token)

            yield webService.delete(action.payload, token)
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
            const token = yield select((x: IRootState) => x.authentication.token)

            yield webService.update(action.payload.id, action.payload, token)
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