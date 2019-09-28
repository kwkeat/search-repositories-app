import {
  takeLatest, all, fork, put, take, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import AppNavigationService from 'navigator/app/AppNavigationService';

function* rehydrate() {
  yield put(Actions.finishRehydrate());
}

function* redirectApp() {
  yield take(Actions.FINISH_REHYDRATE);
  yield call(AppNavigationService.navigate, 'DependencyExplorerScreen');
}

function* watchRehydrate() {
  yield takeLatest('persist/REHYDRATE', rehydrate);
}

function* watchRedirectApp() {
  yield takeLatest(Actions.REDIRECT_APP, redirectApp);
}

export default function* persist() {
  yield all([
    fork(watchRehydrate),
    fork(watchRedirectApp),
  ]);
}
