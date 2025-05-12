import {all} from 'redux-saga/effects'
import {watchLoginSaga} from '.sagas/authSaga'

export function* rootSaga() {
    yield all([
        watchLoginSaga(),
    ])
}
