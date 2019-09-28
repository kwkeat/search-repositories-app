export const NAME = 'NPMPACKAGE';

export const FETCH_INFO = `${NAME}/FETCH_INFO`;
export const FETCH_INFO_SUCCESS = `${NAME}/FETCH_INFO_SUCCESS`;
export const FETCH_INFO_FAIL = `${NAME}/FETCH_INFO_FAIL`;

export const fetchInfo = (packageName, callbackFail) => ({
  type: FETCH_INFO,
  packageName,
  callbackFail,
});

export const fetchInfoSuccess = data => ({
  type: FETCH_INFO_SUCCESS,
  data,
});

export const fetchInfoFail = error => ({
  type: FETCH_INFO_FAIL,
  error,
});
