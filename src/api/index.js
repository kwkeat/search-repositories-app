import api from './helper';

export const fetchSuggestions = packageName => api.get(`search/suggestions?q=${packageName}`);
export const fetchInfo = packageName => api.get(`${packageName}/latest`);
