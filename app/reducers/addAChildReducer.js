const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    addAChild:{}
    }
export default function reducer (state = initialState, action) {
    switch (action.type){
    case "FETCH_ADDACHILD_PENDING": {
        return {...state, fetching: true, error:{}}
        break;
    }
    case "FETCH_ADDACHILD_FULFILLED": {
        return {...state, fetching: false, fetched: true, addAChild: action.payload, error:{}}
        break;
    }
    case "FETCH_ADDACHILD_REJECTED" :{
        return {...state, fetching: false, fetched: false, error: action.payload }
        break;
    }
    default: {
    return {...state}
    }
}
}