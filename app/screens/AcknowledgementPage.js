import heroImage from '../assets/hero.jpg'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import React from 'react'
import  * as locales from './AcknowledgementPageProperties'
import SecondaryHeader from './components/SecondaryHeader'
import ReportingMessage from './components/ReportingMessage'
import {connect} from 'react-redux'
import {submitEvidence} from '../actions/evidenceSubmitAction'
import moment from 'moment-es6';
import astrisk from '../assets/astrisk.png' 
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'

class Acknowledgement extends React.Component{
        constructor(props){
            super(props);
            var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
            this.props.setRequestTime(reqeustTime)
            var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
            this.props.setStartSessionTime(startSessionTime)
            
            this.state = {
                penality: false
            }
    //        this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Acknowledgement page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
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
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Acknowledgement page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
    getReportingMonthAndYearForAddOrRemoveChild(){
        let monthAndYear
        this.props.evidences.list.map((evidence)=>{
            if(evidence.evidenceType === 'EEFDET0023'){
                let month=Number(evidence.reportingPeriod)+1        
                monthAndYear=moment(month, 'MM').format('MMMM');
                monthAndYear = monthAndYear.concat(' ').concat(evidence.year)                
            }
            else if(evidence.evidenceType === 'EEFDET0024'){
                monthAndYear=moment(this.props.serverDate).format('MMMM');
                monthAndYear = monthAndYear.concat(' ').concat(evidence.year)
            }
            else{
                monthAndYear=this.props.monthAndYear.montlyAndYearData.toString();
            }        
            return monthAndYear
        })
        return monthAndYear
    }
    handleChange(e) {this.setState({penality: this.refs.penality.checked})}
    render(){
    let monthAndYear = this.getReportingMonthAndYearForAddOrRemoveChild()     
        let disabled=this.state.penality
        //let callFunction = this.SubmitEvidence(this.props.evidences.list)
        return(
                <div className="container">
                <SecondaryHeader HeadingName="Sign and Submit"/>
                <div className="blockUnderline"></div>
                    <div className='annualSummaryDiv'>
					<div style={{marginBottom: "0px"}}>
                        <p>{locales.strings.ReportingInfomrationHeader} {monthAndYear}:</p>
						</div>
                        <ReportingMessage messages={this.props.evidences.list} userName={this.props.userName}/>                    
                        <br/><p>{locales.strings.ConfirmationMessage}</p>
                        <br/><div className="form_Border1">
                            <p>{locales.strings.ConfirmationMessage1}
                                    <p className="AcknowledgementPage-checkBox-DivStyle">
                                    <label><input name ="penality" ref = "penality" type="checkbox" onChange={this.handleChange.bind(this)}/><span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                                    <span><b>{locales.strings.PenaltyPerjuryMessage}</b></span>
                                </p>
                            </p>
                        </div>
                        <div className="row form-label-style" >
                            <div className="col-md-6 col-sm-6 col-xs-6">
                                <ButtonFunctionality ButtonName={locales.strings.ButtonCancel} redirectTo="AddExemptionWorkActivity" dstClassName="btn button-text buttonBack1"/>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-6 buttonAlignRight">
                                <ButtonFunctionality ButtonName={locales.strings.ButtonSave} redirectTo="SubmissionStatus" dstClassName="btn button-text buttonBack1" disabled={!disabled}/>
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
    monthAndYear: store.montlySummaryData,
    pageDetails: store.pageDetailsReducer
    };
}
export default connect(mapStateToProps,{addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(Acknowledgement);