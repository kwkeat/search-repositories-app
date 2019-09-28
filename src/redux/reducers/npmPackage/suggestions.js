import Actions from 'actions';

const getDefaultState = () => ({ isLoading: false, error: null, data: [] });

function fetchSuggestions(state, action) {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }
  switch (action.type) {
    case Actions.FETCH_SUGGESTIONS:
      return {
        isLoading: true,
        error: null,
        data: [],
      };
    case Actions.CLEAR_SUGGESTIONS:
      return {
        isLoading: false,
        error: null,
        data: [],
      };
    case Actions.FETCH_SUGGESTIONS_SUCCESS:
      return {
        isLoading: false,
        error: null,
        data: action.data,
      };
    case Actions.FETCH_SUGGESTIONS_FAIL:
      return {
        isLoading: false,
        error: action.error,
        data: [],
      };
    default:
      return state;
  }
}

export default fetchSuggestions;
