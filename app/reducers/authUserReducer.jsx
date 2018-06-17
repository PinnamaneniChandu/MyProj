const initialState= {
	fetching: false,
	fetched: false,
	userDetails:{
		userName:'unauthenticated',
		isAuth:false
	},
	error: null
};
export default function reducer(state=initialState,action){
	switch(action.type){
		case "FETCH_AUTHORIZEUSER_PENDING":{
			return {...state,fetching:true}
			break;
		}
		case "FETCH_AUTHORIZEUSER_FULFILLED":{
			return {...state,fetching:false,fetched:true,userDetails:action.payload}
			break;
		}
		case "FETCH_AUTHORIZEUSER_REJECTED":{
			return {...state,fetching:false,fetched:false,error:action.payload}
			break;
		}
	}
	return state;
}