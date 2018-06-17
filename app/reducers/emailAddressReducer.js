const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    email:''
}

export default function reducer (state = initialState, action) {
    switch (action.type){
        case "FETCH_EMAILADDRESS_PENDING": {
        return {...state, fetching: true, error:{}}
        break;
        }
        case "FETCH_EMAILADDRESS_FULFILLED": {
        return {...state, fetching: false, fetched: true, email: action.payload, error:{}} 
        break;
        }
        case "FETCH_EMAILADDRESS_REJECTED" :{
        return {...state, fetching: false, fetched: false, error: action.payload, email: "error" }
        break;
        }
        case "FETCH_EMAILADDRESS_CLEAR" :{
            return {...state, fetching: false, fetched: false, error: action.payload}
            break;
        }
        default: {
        return {
        ...state
        }
    }
}
}