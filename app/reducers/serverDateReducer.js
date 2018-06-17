const initialState= {
	fetching: false,
	fetched: false,
	serverDate: '',
	fomatedServerDate: '',
	error: null
};
export default function reducer(state=initialState,action){
	switch(action.type){
		case "FETCH_SERVERDATE_PENDING":{
			return {...state,fetching:true}
			break;
		}
		case "FETCH_SERVERDATE_FULFILLED":{
			return {...state,fetching:false,fetched:true,serverDate:action.payload}
			break;
		}
		case "FETCH_SERVERDATE_REJECTED":{
			
			return {...state,fetching:false,fetched:false,error:action.payload}
			break;
		}
		case "FORMATED_SERVERDATE_FULFILLED":{
			return {...state,fetching:false,fetched:true,fomatedServerDate:action.payload}
			break;
		}
	}
	return state;
}