const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    alcoholDrug:{}
    }
export default function reducer (state = initialState, action) {
    switch (action.type){
    case "FETCH_ALCOHOLDRUG_PENDING": {
        return {...state, fetching: true, error:{}}
        break;
    }
    case "FETCH_ALCOHOLDRUG_FULFILLED": {
        return {...state, fetching: false, fetched: true, alcoholDrug: action.payload, error:{}}
        break;
    }
    case "FETCH_ALCOHOLDRUG_REJECTED" :{
        return {...state, fetching: false, fetched: false, error: action.payload }
        break;
    }
    default: {
    return {...state}
    }
  }
}