import {call, put, takeLatest } from "redux-saga/effects";
import {SagaIterator} from "redux-saga";
import {loginRequest, setAuth, loginFailed} from "@store/auth";
import { apiLogin } from '../../api/authApi'

function* loginSaga( action: ReturnType<typeof loginRequest>): SagaIterator {
    try{
        const response = yield call(apiLogin, action.payload);

        yield put(setAuth(response))
    } catch(error:unknown) {
        if (error instanceof Error) {
            yield put(loginFailed(error.message))
        } else {
            yield put(loginFailed('Unknown error'))
        }
    }
}

export function* watchLoginSaga() {
    yield takeLatest(loginRequest.type, loginSaga)
}
