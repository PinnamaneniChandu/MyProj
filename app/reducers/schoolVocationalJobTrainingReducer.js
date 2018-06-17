const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    schoolVocationalJobTraining:{}
    }
export default function reducer (state = initialState, action) {
    switch (action.type){
    case "FETCH_SCHOOLVOCATIONALJOBTRAINING_PENDING": {
        return {...state, fetching: true, error:{}}
        break;
    }
    case "FETCH_SCHOOLVOCATIONALJOBTRAINING_FULFILLED": {
        return {...state, fetching: false, fetched: true, schoolVocationalJobTraining: action.payload, error:{}}
        break;
    }
    case "FETCH_SCHOOLVOCATIONALJOBTRAINING_REJECTED" :{
        return {...state, fetching: false, fetched: false, error: action.payload }
        break;
    }
    default: {
    return {...state}
    }
}
}