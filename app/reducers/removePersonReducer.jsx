const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    list:''
    }
export default function reducer (state, action) {
    switch (action.type){
    case "FETCH_REMOVEMEMBER_FULFILLED": {
        return {...state, fetching: false, fetched: true, list: action.payload, error:{}}
        break;
    }
    
    default: {
    return {...state}
    }
 }
}