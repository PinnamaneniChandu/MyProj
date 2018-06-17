const initialState= {
	fetching: false,
	fetched: false,
	address:{
		displayText:null
	},
	error: null
};

export default function reducer(state=initialState,action){
	switch(action.type){
		case "FETCH_PRIVATEADDRESS_PENDING":{
			return {...state,fetching:true,error:{}}
			break;
		}
		case "FETCH_PRIVATEADDRESS_FULFILLED":{
			return {...state,fetching:false,fetched:true,address:action.payload,error:{}}
			break;
		}
		case "FETCH_PRIVATEADDRESS_REJECTED":{
			return {...state,fetching:false,error:action.payload,address:{}}
			break;
		}
	}
	return state;
}
