export const NAME = 'NPMPACKAGE';

export const FETCH_INFO = `${NAME}/FETCH_INFO`;
export const FETCH_INFO_SUCCESS = `${NAME}/FETCH_INFO_SUCCESS`;
export const FETCH_INFO_FAIL = `${NAME}/FETCH_INFO_FAIL`;

export const fetchSuggestions = packageName => ({
  type: FETCH_INFO,
  packageName,
});

export const fetchSuggestionsSuccess = data => ({
  type: FETCH_INFO_SUCCESS,
  data,
});

export const fetchSuggestionsFail = error => ({
  type: FETCH_INFO_FAIL,
  error,
});
