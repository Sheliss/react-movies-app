export const initialState = {
    loading: true,
    movies: [],
    errorMessage: null,
    showPopup: false,
    popupLoading: true,
    movieDetailsError: null
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SEARCH_MOVIES_REQUEST':
            return {
               ...state,
               errorMessage: null,
               loading: true
            };
        case 'SEARCH_MOVIES_SUCCESS':
            return {
                ...state,
                loading: false,
                movies: action.payload
            };
        case 'SEARCH_MOVIES_FAIL':
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            };
        case 'DETAIL_MOVIE_REQEST':
            return {
                ...state,
               errorMessage: null,
               showPopup: true,
               popupLoading: true
            }
        case 'DETAIL_MOVIE_SUCCESS':
            return {
                ...state,
                showPopup: true,
                movieDetailsError: null,
                popupLoading: false,
                movieDetails: action.payload
            }
        case 'POPUP__CLOSE':
            return {
                ...state,
                showPopup: false
            }
        default:
            return state;
    }
}