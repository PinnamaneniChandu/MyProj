import heroImage from '../assets/hero.jpg'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import React from 'react'
import { connect } from 'react-redux'
import SecondaryHeader from './components/SecondaryHeader'
import * as locales from './RemoveExemptionProperties'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'
import moment from 'moment-es6';
class RemoveExemption extends React.Component{

    constructor(props){        
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Remove Exemption page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
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
       this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Remove Exemption page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
     }
    render(){
        let lang = locales.strings;
        return(
            <div className="container">
            <SecondaryHeader HeadingName={lang.heading} />
            <div className='annualSummaryDiv'>
                <div className='centerAlignStyle'>
                <h4>{lang.removing} {this.props.evidences.list[this.props.location.data.data].evidenceName}</h4>
                </div>
                <div className="row form-label-style centerAlignStyle">
                <div className="col-md-6 col-sm-6 col-xs-6" style={{textAlign: "center"}}>
                <ButtonFunctionality ButtonName={lang.cancel} redirectTo="MonthlySummaryPage" dstClassName="btn button-text buttonBack1  overflow-visible"/>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-6">
                <ButtonFunctionality ButtonName={lang.continue} redirectTo="MonthlySummaryPage" dstClassName="btn button-text buttonBack1  overflow-visible" data={this.props.location.data.data}/>
                </div>
                </div> 
            </div>
            </div>
             )
            }
        }
        function mapStateToProps(store) {
            return {
            evidences:store.evidences,
            pageDetails: store.pageDetailsReducer
            };
        }
        export default connect(mapStateToProps,{addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(RemoveExemption);