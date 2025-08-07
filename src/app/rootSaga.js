import { all } from 'redux-saga/effects';
import externalApiSaga from '../features/externalApi/externalApiSaga';

export default function* rootSaga() {
  yield all([
    externalApiSaga(),
  ]);
}