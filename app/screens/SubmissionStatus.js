import React from 'react'
import {connect} from 'react-redux'
import {submitEvidence, clearResponse} from '../actions/evidenceSubmitAction'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import Submission from './SubmissionPage'
import SystemFailurePage from './SystemFailurePage'
import {submitPageDetails} from '../actions/LoggingCommonActions'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import moment from 'moment-es6';

class SubmissionStatus extends React.Component {
    constructor(props){        
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
       //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Submission Status page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
    }
    componentDidMount(){
        var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setResponseTime(responseTime)
        //this.props.submitEvidence(this.props.evidences.list)
    }
    componentWillUnmount(){
        let pageEndTime =moment();
        var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
        var PageTimeEnd = duration.asSeconds();  
        this.props.setSessionTime(PageTimeEnd)
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Submission Status page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
    componentWillMount(){
        this.props.submitPageDetails(this.props.pageDetails.list)
        this.props.submitEvidence(this.props.evidences.list)
    }
    DisplayStatus(){
        let status
        if(this.props.submitedEvidence.evidenceResponse.commondatadtls !== '' && this.props.submitedEvidence.evidenceResponse.commondatadtls !== undefined && this.props.submitedEvidence.evidenceResponse.commondatadtls !== null){
            this.props.submitedEvidence.evidenceResponse.commondatadtls.commonDataList.map((nameValue)=>{
                if(nameValue.name === 'operationStatus'){
                    status=nameValue.value
                } 
            })
        }
        return status
    }
    
    render(){
        let displayStatus = undefined
        
        if(this.props.submitedEvidence.evidenceResponse !== 'error'){
            if(this.props.submitedEvidence.evidenceResponse.commondatadtls !== '' && this.props.submitedEvidence.evidenceResponse.commondatadtls !== undefined && this.props.submitedEvidence.evidenceResponse.commondatadtls !== null){
                
                displayStatus = this.DisplayStatus()
            }
        }else if(this.props.submitedEvidence.evidenceResponse === 'error'){
            displayStatus = false
        }
        
        let submission;
        if(displayStatus !== undefined ){
            
            if( displayStatus === 'true'){
                submission = <Submission curamServerDate={this.props.serverDate}/>
            }
            else if( displayStatus === false){
                submission = <SystemFailurePage/>                
            }
        }else{
            submission = <h4>Processing your request...</h4>
        }
        return(
            <div>
            {submission}
            </div>
        )
    }
}
function mapStateToProps(store) {
    
    return{
        submitedEvidence: store.submitedEvidence,
        evidences:store.evidences, 
        pageDetails: store.pageDetailsReducer
    }
    
}

export default connect(mapStateToProps,{submitEvidence,clearResponse,submitPageDetails,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(SubmissionStatus);