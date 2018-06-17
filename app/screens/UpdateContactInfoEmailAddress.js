import React from 'react'
import '../CSS/App-DesktopsScreen.css'
import '../CSS/App-extraSmallScreen.css'
import '../CSS/App-mediumScreen.css'
import '../CSS/App-smallScreen.css'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import SecondaryHeader from './components/SecondaryHeader'
import inputtextField from '../utilities/InputFiled'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import  * as locales from './UpdateEmailAddressProperties'
import $ from 'jquery'
import ErrorMessage from './components/ErrorMessage'
import astrisk from '../assets/astrisk.png'
import {addPageLoggingInfo} from '../actions/LoggingCommonActions'
import moment from 'moment-es6';
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'

class UpdateContactInfoEmailAddress extends React.Component {
    constructor(props){
        super(props);
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Email Address Class Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        this.state = {
            newEmail: '',
            reEnterEmail: '',
            errorMessages:[],
            redirectTo:'',
            disabled:''
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
        this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Email Address Class Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
      }
    handleNewEmailValues(){
            this.setState({
                newEmail:this.refs.newEmail.value
            })                
    }
    handleReEnterEmailValues(){
        this.setState({
            reEnterEmail: this.refs.reEnterEmail.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
    }
    validateEmailAddress(emailData){
        let newemail = emailData.newEmail
        if(newemail.length > 63 || newemail.length < 5){
        }
    }
    onMouseEnterHandler(event){ 
        let lang=locales.strings;
        let validationMsg = new Set();
            for (var key in this.state) {
                if(key==='newEmail' && (this.state.newEmail.length < 5 || this.state.newEmail.length > 63)){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.InValidEmailLength)})
                }              
                else if(key==='newEmail' && !(/^(?!-)(?!\.)(?!.*--)(?!.*\.\.)(?!.{63})[A-Za-z0-9_%+.-]+@[A-Za-z0-9.][A-Za-z0-9.-]+\.[A-Za-z0-9]{2,6}$/.test(this.state.newEmail))){             
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.InValidEmailAddress)})
                } 
                else if(key==='newEmail' && (this.state[key] !== this.state.reEnterEmail)){
                    validationMsg.add({key:key,firstMessage:lang.formatString(lang.MatchEmailAddress)})
                }
                let array = Array.from(validationMsg)
                let redirectTo
                let disabled
                if(array.length<=0){
                    redirectTo = 'UpdateContactInformationPage'
                    disabled = false
                }
                else
                    {
                        redirectTo = 'UpdateContactInfoEmailAddress'
                        disabled = true

                    }
                this.setState({errorMessages:array,redirectTo:redirectTo,disabled:disabled})
                }
            }
    render(){
        let lang=locales.strings;
        let disabled=this.state.newEmail?this.state.newEmail===this.state.reEnterEmail:false
        let EmailAddress = this.validateEmailAddress(this.state)
        let emailData = {
            emailAddress: this.state.newEmail,
            contactType: 'EMAIL'
        }
    
        return(
            <div className="container">
                <SecondaryHeader HeadingName={lang.headingLabel} homeLink = 'No'/>
                    <div className="blockUnderline"></div>
                    <ErrorMessage errors={this.state.errorMessages}/>
                    <span className="required col-md-12 col-sm-12 col-xs-12">* Indicates a required field</span>
                <div>
                    <div className='row sideHeaders'>
                        <div>
                            <p>{locales.strings.CurrentEmail} {this.props.location.data.data.emailAddress}</p>
                        </div>
                    </div>
                    <div>
                        <p className="SpecialHealthNeedsForm-enterInformation-Paragraph">{lang.SubHeadingName}</p>
                        <form ref='emailAddress_form' onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row addIncomeFormDivStyle">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="col-md-4 col-sm-12 col-xs-12">
                                        <label>{lang.newEmailLabel}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                                    </div>
                                    <div className="col-md-8 col-sm-12 col-xs-12  centerAlignStyle">
                                        <input name="newEmail" ref="newEmail" type="email" className="form-control" id="newEmail"  onChange={this.handleNewEmailValues.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row addIncomeFormDivStyle">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="col-md-4 col-sm-12 col-xs-12">
                                        <label>{lang.reEnterEmailLabel}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                                    </div>
                                    <div className="col-md-8 col-sm-12 col-xs-12  centerAlignStyle">
                                        <input name="reEnterEmail" ref="reEnterEmail" type="email" className="form-control" id="reEnterEmail"  onChange={this.handleReEnterEmailValues.bind(this)} />
                                        </div>
                                </div>
                            </div>
                            <div style={{marginBottom: "20px"}}></div>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="row addIncomeFormDivStyle">
                                    <div className="col-md-11 col-sm-7 col-xs-7" >
                                    <ButtonFunctionality ButtonName="Cancel" redirectTo="UpdateContactInformationPage" dstClassName="btn button-text buttonBack1"/>
                                    </div>
                                    <div className="col-md-1 col-sm-5 col-xs-5 buttonAlignRight" onMouseEnter={this.onMouseEnterHandler.bind(this)}>
                                    <ButtonFunctionality ButtonName="Save" redirectTo="UpdateProcessingContactInformation" dstClassName="btn buttonBack1 marginLeftForButtons" disabled={this.state.disabled} data={emailData}/>
                                    </div>
                                </div>
                          </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(store) {
    return {
    pageDetails: store.pageDetailsReducer
    };
}

export default connect(mapStateToProps, {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(UpdateContactInfoEmailAddress)