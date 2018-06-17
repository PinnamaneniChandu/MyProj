const initialState= {
	fetching: false,
	fetched: false,
	personMatch:undefined,
	error: null
};
export default function reducer(state=initialState,action){
	switch(action.type){
		case "FETCH_PERSONMATCH_PENDING":{
			return {...state,fetching:true}
			break;
		}
		case "FETCH_PERSONMATCH_FULFILLED":{			
			return {...state,fetching:false,fetched:true,personMatch:action.payload}
			break;
		}
		case "FETCH_PERSONMATCH_REJECTED":{
			return {...state,fetching:false,fetched:false,error:action.payload}
			break;
		}
		case "FETCH_PERSONMATCH_CLEAR":{
			return {...state,fetching:false,fetched:false,personMatch:action.payload}
			break;
		}
	}
	return state;
}