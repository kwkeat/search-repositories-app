import { all, fork } from 'redux-saga/effects';
import suggestions from './suggestions';

export default function* auth() {
  yield all([
    fork(suggestions),
  ]);
}
