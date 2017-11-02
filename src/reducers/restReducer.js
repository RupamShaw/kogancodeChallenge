const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    error: null,
};
const restReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_USERS_START": {
            return { ...state, fetching: true }
        }
        case "FETCH_USERS_REJECTED": {
            return { ...state, fetching: false, error: action.payload }
        }
        case "FETCH_USERS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                users: action.payload,
            }
        }
        default:
            return state
    }
}
export default restReducer;
