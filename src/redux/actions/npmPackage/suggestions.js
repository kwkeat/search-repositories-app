export const NAME = 'NPMPACKAGE';

export const FETCH_SUGGESTIONS = `${NAME}/FETCH_SUGGESTIONS`;
export const FETCH_SUGGESTIONS_SUCCESS = `${NAME}/FETCH_SUGGESTIONS_SUCCESS`;
export const FETCH_SUGGESTIONS_FAIL = `${NAME}/FETCH_SUGGESTIONS_FAIL`;
export const CLEAR_SUGGESTIONS = `${NAME}/CLEAR_SUGGESTIONS`;

export const fetchSuggestions = packageName => ({
  type: FETCH_SUGGESTIONS,
  packageName,
});

export const fetchSuggestionsSuccess = data => ({
  type: FETCH_SUGGESTIONS_SUCCESS,
  data,
});

export const fetchSuggestionsFail = error => ({
  type: FETCH_SUGGESTIONS_FAIL,
  error,
});

export const clearSuggestions = () => ({
  type: CLEAR_SUGGESTIONS,
});
