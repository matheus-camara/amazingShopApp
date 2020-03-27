import { WebService } from "../../services";
import { all, takeLatest, put, delay } from "redux-saga/effects";
import { IAction, UserSagaActions, UserStoreActions } from "../../actions";
import { push } from "connected-react-router";
import { Routes } from "../../constants/routes";

const webService = new WebService({ baseUrl: "user" })

function* loginSaga(action: IAction<{ name: string, password: string }>) {
    try {
        if (action.payload) {
            const response: { token: string } = yield webService.post(action.payload, "login")

            yield put({
                type: UserStoreActions.Login,
                payload: response.token
            })
            yield delay(100, true)
            yield put(push(Routes.DASHBOARD_PAGE))
        }
    } catch (error) {

    }
}

function* watchLoginSaga() {
    yield takeLatest(UserSagaActions.Login, loginSaga)
}

function* registerSaga(action: IAction<{ name: string, email: string, password: string }>) {
    try {
        yield webService.post(action.payload, "register")

        yield put({
            type: UserSagaActions.Login,
            payload: {
                name: action.payload?.name,
                password: action.payload?.password,
            }
        })
    } catch (error) {

    }
}

function* watchRegisterSaga() {
    yield takeLatest(UserSagaActions.Register, registerSaga)
}

export function* watchUsersSaga() {
    yield all([
        watchLoginSaga(),
        watchRegisterSaga()
    ])
}
