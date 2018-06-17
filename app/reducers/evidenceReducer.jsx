const initialState ={
    fetching:false,
    fetched: false,
    error: null,
    list: []
    }
    export default function reducer (state=initialState, action) {
        switch (action.type){
        case "FETCH_EVIDENCES_FULFILLED": {
            return {...state, fetching: false, fetched: true, list: action.payload, error:{}}
            break;
        } 
        case "FETCH_EVIDENCES_CLEAR": {
            return {...state, fetching: false, fetched: true, list: action.payload, error:{}}
            break;
        }
        default: {
        return {...state}
        }
    }
}