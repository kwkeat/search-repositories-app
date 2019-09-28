import Actions from 'actions';

const getDefaultState = () => ({ isLoading: false, error: null, data: {} });

function fetchInfo(state, action) {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }
  switch (action.type) {
    case Actions.FETCH_INFO:
      return {
        isLoading: true,
        error: null,
        data: {},
      };
    case Actions.FETCH_INFO_SUCCESS:
      return {
        isLoading: false,
        error: null,
        data: action.data,
      };
    case Actions.FETCH_INFO_FAIL:
      return {
        isLoading: false,
        error: action.error,
        data: {},
      };
    default:
      return state;
  }
}

export default fetchInfo;
