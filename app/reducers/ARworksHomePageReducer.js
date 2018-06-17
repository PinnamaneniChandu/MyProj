const initialState ={
    fetching:false,
    fetched: true,
    error: null,
    ARWorksSummary:{
        "commondatadtls" : {
            "commonDataList" : [ ]
        },
        "evidencedtls" : {
            "evidenceList" : [ ]
        },
        "infomsgdtls" : {
            "dtls" : [ ]
        }
    }
}
export default function reducer (state = initialState, action) {
    switch (action.type){
        case "FETCH_HOMEPAGE_PENDING": {
        return {...state, fetching: true, error:{}}
        break;
    }
        case "FETCH_HOMEPAGE_FULFILLED": {
        return {...state, fetching: false, fetched: true, ARWorksSummary: action.payload, error:{}}
        break;
    }
        case "FETCH_HOMEPAGE_REJECTED" :{
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