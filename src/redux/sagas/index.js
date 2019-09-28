import { all, fork } from 'redux-saga/effects';
import npmPackage from './npmPackage';
import common from './common';

export default function* root() {
  yield all([
    fork(npmPackage),
    fork(common),
  ]);
}
