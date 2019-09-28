import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import * as api from 'api';

function* fetchSuggestions({ packageName }) {
  try {
    const response = yield call(api.fetchSuggestions, packageName);
    if (response.status === 200) {
      const nameList = response.data.map(packageList => packageList.name);
      yield put(Actions.fetchSuggestionsSuccess(nameList));
    }
  } catch (error) {
    yield put(Actions.fetchSuggestionsFail(error));
  }
}

function* watchFetchSuggestions() {
  yield takeLatest(Actions.FETCH_SUGGESTIONS, fetchSuggestions);
}

export default function* npmPackage() {
  yield all([
    fork(watchFetchSuggestions),
  ]);
}
