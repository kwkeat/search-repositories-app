import { all, fork } from 'redux-saga/effects';
import suggestions from './suggestions';
import info from './info';

export default function* auth() {
  yield all([
    fork(suggestions),
    fork(info),
  ]);
}
