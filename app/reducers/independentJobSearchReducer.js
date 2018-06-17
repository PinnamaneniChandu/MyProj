const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    independentJob:{}
    }
export default function reducer (state = initialState, action) {
    switch (action.type){
        case "FETCH_INDEPENDENTJOBSEARCH_PENDING": {
            return {...state, fetching: true, error:{}}
            break;
        }
        case "FETCH_INDEPENDENTJOBSEARCH_FULFILLED": {
            return {...state, fetching: false, fetched: true, independentJob: action.payload, error:{}}
            break;
        }
        case "FETCH_INDEPENDENTJOBSEARCH_REJECTED" :{
            return {...state, fetching: false, fetched: false, error: action.payload }
            break;
        }
        default: {
        return {...state}
        }
    }
}