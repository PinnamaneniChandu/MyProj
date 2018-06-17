import "babel-polyfill";
export const mymsg= {
API_HOST : getRestUrl(),
USER_NOT_EXISTED:"User Not Existed"
}

export function getRestUrl()
{
    var CPHOSTNAME = window.location.hostname;
    var RESTAPI_HOST, govPosition, restHOSTURL;
    var protocol = window.location.protocol;
    if(CPHOSTNAME.indexOf("eligibilityenrollment.arkansas.gov")>=1) {
        govPosition=CPHOSTNAME.indexOf("gov") + 3;
        restHOSTURL=CPHOSTNAME.slice(0,govPosition);
        RESTAPI_HOST=protocol + "//" + restHOSTURL + "/Rest/v1";
    }
    if(RESTAPI_HOST===undefined){
        RESTAPI_HOST="http://localhost:8080/Rest/v1"
    }    
    return RESTAPI_HOST;
}