import heroImage from '../assets/hero.jpg'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import React, {PropTypes} from 'react'
import SecondaryHeader from './components/SecondaryHeader'
import Moment from 'moment'
import {fetchMembers} from '../actions/HHMembersAction'
import {getHHMembers} from '../actions/CommonActions'
import {connect} from 'react-redux'
import { updateAddress } from '../actions/informationAction'
import  * as locales from './RemoveContactInfoErrorPageProperties'
import warningImage from '../assets/warning.png'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import moment from 'moment-es6';
class RemoveContactInfoErrorPage extends React.Component{

    constructor(props){
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Remove ContactInfo Error page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
        
    }   
    componentDidMount(){
        var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setResponseTime(responseTime)
     }
     
     componentWillUnmount(){
       let pageEndTime =moment();
       var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
       var PageTimeEnd = duration.asSeconds();  
       this.props.setSessionTime(PageTimeEnd)
       this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Remove ContactInfo Error page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
     } 
render(){
    let lang=locales.strings;
    let warning=this.props.location? this.props.location.data.data:undefined;
    let isRequired='is required';
    let confirmation= lang.Confirmation;
    let note= lang.Note
    if(warning === 'Mailing address'){
        //warning=warning.errorMessage?warning.errorMessage:undefined
        isRequired='is required';
        confirmation= '';
        note= ''
    }else if(warning.errorMessage){
        isRequired=''
        warning=warning.errorMessage?warning.errorMessage:undefined
        confirmation = ''
        note = ''
    }
        return(
            <div className="container">
                <SecondaryHeader HeadingName={lang.Heading} homeLink = 'No'/>
				<div className="blockUnderline" style={{marginBottom: '2pc'}}></div>
                <div className='annualSummaryDiv'>
                        <div className="row addIncomeFormDivStyle">
                            <div className="col-md-1 col-sm-4 col-xs-4">              
                                <img src={warningImage} className="systemfailureImageStyle img-responsive" alt='systemProcessingFailure'/>
                            </div>
                            <div className="col-md-11 col-sm-8 col-xs-8 systemfailureTextStyle" >
                                <p>{warning} {isRequired}</p>
                            </div>
                        </div>
                        <p> {confirmation} </p>
                        <small style={{fontWeight: "BOLD" }}> {note}</small>                                
                        <div className="centerAlignStyle" style={{paddingTop: '2px'}}>
                            <ButtonFunctionality ButtonName={lang.ButtonNext} redirectTo="InformationPage" dstClassName="btn btn-lg-md btn-lg-sm btn-lg-xs buttonBack1" />
                        </div>          
                    </div>        
            </div>  
        );
    }
}

function mapStateToProps(store) {
    return {
    pageDetails: store.pageDetailsReducer
    };
}

export default connect(mapStateToProps, {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(RemoveContactInfoErrorPage)

