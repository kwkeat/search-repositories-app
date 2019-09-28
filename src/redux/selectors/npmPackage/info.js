export const NAME = 'NPMPACKAGE';

export const isFetchInfoLoading = store => store[NAME].info.isLoading;
export const getPackageInfo = store => store[NAME].info.data;
