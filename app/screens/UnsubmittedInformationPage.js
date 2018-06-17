import heroImage from '../assets/hero.jpg'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import React from 'react'
import * as locales from './UnsubmittedInformationProperties.js'
import warning from '../assets/warning.png';
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import {connect} from 'react-redux'
import moment from 'moment-es6';
/* Need to implement image into this page */

class UnsubmittedInformationPage extends React.Component {
    constructor(props){
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Unsubmitted Information page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
        this.state = {
            loading : true
        }
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
       this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Unsubmitted Information page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
     }
    render() {
        let lang = locales.strings;
        return (
            <div className="container">
                <img src={heroImage} className='heroImageStyle img-responsive' width='' height='' alt='' style={{ marginBottom: '3%' }} />
                <div className='annualSummaryDiv'>
                <div className="row addIncomeFormDivStyle">
                <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                <img src={warning} className="systemfailureImageStyle img-responsive" width='90' height='67' alt='systemProcessingFailure'/>
                                </div>
                                <div className="col-md-8 col-sm-12 col-xs-12">
                                <h1> {lang.leaveSite} </h1>
                                </div>
                </div>          
                </div>
                    <small>{lang.chnagesSaved}</small>
                        <div className="centerAlignStyle">
                        <ButtonFunctionality ButtonName={lang.leave} redirectTo="" dstClassName="btn button-text buttonBack1  overflow-visible" />
                        <ButtonFunctionality ButtonName={lang.stay} redirectTo="" dstClassName="btn button-text buttonBack1  overflow-visible" />
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(store) {
    return{
       
        pageDetails: store.pageDetailsReducer
    }
}
export default connect(mapStateToProps, {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(UnsubmittedInformationPage)