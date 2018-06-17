const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    phoneNumber: ''
}

export default function reducer (state = initialState, action) {
    switch (action.type){
        case "FETCH_PHONENUMBER_PENDING": {
        return {...state, fetching: true, error:{}}
        break;
        }
        case "FETCH_PHONENUMBER_FULFILLED": {
        return {...state, fetching: false, fetched: true, phoneNumber: action.payload, error:{}} 
        break;
        }
        case "FETCH_PHONENUMBER_REJECTED" :{
        return {...state, fetching: false, fetched: false, error: action.payload, phoneNumber:"error" }
        break;
        }
        case "FETCH_PHONENUMBER_CLEAR" :{
            return {...state, fetching: false, fetched: false, error: action.payload }
            break;
        }
        default: {
        return {
        ...state
        }
    }
}
}