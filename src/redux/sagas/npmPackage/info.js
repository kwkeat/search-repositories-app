import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import * as api from 'api';
import AppNavigationService from 'navigator/app/AppNavigationService';

function* fetchInfo({ packageName, callbackFail }) {
  try {
    const response = yield call(api.fetchInfo, packageName);
    if (response.status === 200) {
      yield put(Actions.fetchInfoSuccess(response.data));
      yield put(Actions.clearSuggestions());
      yield call(AppNavigationService.navigate, 'PackageOverviewScreen');
    }
  } catch (error) {
    if (callbackFail) {
      yield call(callbackFail);
    }
    yield put(Actions.fetchInfoFail(error));
  }
}

function* watchFetchInfo() {
  yield takeLatest(Actions.FETCH_INFO, fetchInfo);
}

export default function* npmPackage() {
  yield all([
    fork(watchFetchInfo),
  ]);
}
