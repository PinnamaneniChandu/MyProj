const initialState= {
	fetching: false,
	fetched: false,
	response: null,
	error: null
};
export default function reducer(state=initialState,action){
	switch(action.type){
		case "FETCH_ADDINCOME_PENDING":{
			return {...state,fetching:true}
			break;
		}
		case "FETCH_ADDINCOME_FULFILLED":{
			return {...state,fetching:false,fetched:true,response:action.payload}
			break;
		}
		case "FETCH_ADDINCOME_REJECTED":{
			return {...state,fetching:false,fetched:false,error:action.payload}
			break;
		}
	}
	return state;
}