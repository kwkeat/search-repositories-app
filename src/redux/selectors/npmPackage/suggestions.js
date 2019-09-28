export const NAME = 'NPMPACKAGE';

export const isFetchSuggestionsLoading = store => store[NAME].suggestions.isLoading;
export const getSuggestionsList = store => store[NAME].suggestions.data;
