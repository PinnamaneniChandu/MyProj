const initialState= {
	fetching: false,
	fetched: false,
	pendingAppDetails:undefined,
	error: null
};
export default function reducer(state=initialState,action){
	switch(action.type){
		case "FETCH_PENDINGAPP_PENDING":{
			return {...state,fetching:true}
			break;
		}
		case "FETCH_PENDINGAPP_FULFILLED":{
			return {...state,fetching:false,fetched:true,pendingAppDetails:action.payload}
			break;
		}
		case "FETCH_PENDINGAPP_REJECTED":{
			return {...state,fetching:false,fetched:false,error:action.payload}
			break;
		}
	}
	return state;
}