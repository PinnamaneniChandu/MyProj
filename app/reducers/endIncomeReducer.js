const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    endIncome:{}
    }
export default function reducer (state = initialState, action) {
    switch (action.type){
    case "FETCH_ENDINCOME_PENDING": {
        return {...state, fetching: true, error:{}}
        break;
    }
    case "FETCH_ENDINCOME_FULFILLED": {
        return {...state, fetching: false, fetched: true, endIncome: action.payload, error:{}}
        break;
    }
    case "FETCH_ENDINCOME_REJECTED" :{
        return {...state, fetching: false, fetched: false, error: action.payload }
        break;
    }
    default: {
    return {...state}
    }
  }
}