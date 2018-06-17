import React from 'react'
import '../CSS/App.css'
import '../CSS/App-DesktopsScreen.css'
import SecondaryHeader from './components/SecondaryHeader'
import PhoneNumberComponent from '././components/PhoneNumberComponent'
import ButtonFunctionality from '../ClickFunc/ButtonFunctionality'
import  * as locales from './PhoneNumberProperties.js'
import ErrorMessage from './components/ErrorMessage'
import {validatePhoneNumber,validateAreaCode,validatePhoneNumberMandatory,validateAreaCodeMandatory} from '../actions/CommonValidationActions'
import moment from 'moment-es6';
import { connect } from 'react-redux'
import { phoneNumberInformation } from '../actions/phoneNumberAction.js'
import {addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime} from '../actions/LoggingCommonActions'

class PhoneNumber extends React.Component {
    constructor(props){        
        super(props);
        var reqeustTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
        this.props.setRequestTime(reqeustTime)
        var startSessionTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');//moment(new Date(), 'YYYY-MM-DD HH:mm:ss.sss');
        this.props.setStartSessionTime(startSessionTime)
        //this.props.addPageLoggingInfo(this.props.pageDetails.list,this.props.userName,'Phone Number Page',moment(new Date()).format('MM/DD/YYYY hh:mm:ss A').toLocaleString(),this.props.pageDetails.ipAddress)

        if(this.props.location.data.data.phoneAreaCode !== "" || this.props.location.data.data.phoneNumber !== "" 
            || this.props.location.data.data.MphoneNumber !== "" || this.props.location.data.data.MphoneAreaCode !== ""){

        
			
        if((this.props.location.data.data.phoneAreaCode !== "" || this.props.location.data.data.phoneNumber !== "") && (this.props.location.data.data.phoneType === 'PH1' || this.props.location.data.data.phoneType === 'PH3')){

            this.state={
                PareaCode: this.props.location.data.data.phoneAreaCode,
                PphoneNumber: this.props.location.data.data.phoneNumber,
                MareaCode: this.props.location.data.data.MphoneAreaCode,
                MphoneNumber: this.props.location.data.data.MphoneNumber,
                errorMessages:[],
                disabled:''
            }
        }else{
            this.state={
                PareaCode: '',
                PphoneNumber: '',
                MareaCode: '',
                MphoneNumber: '',
                errorMessages:[],
                disabled:''
            }
        }
    }
}
componentWillUnmount(){
    let pageEndTime =moment();
    var duration = moment.duration(pageEndTime.diff(this.props.pageDetails.startSessionTime));
    var PageTimeEnd = duration.asSeconds();  
    this.props.setSessionTime(PageTimeEnd)
    this.props.addPageLoggingInfo1(this.props.pageDetails.list,this.props.userName,'Phone Number Page',this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.requestTime.toLocaleString(),this.props.pageDetails.responseTime.toLocaleString(),PageTimeEnd.toLocaleString())
  }
componentDidMount(){
    var responseTime = moment(new Date()).format('MM/DD/YYYY hh:mm:ss.SSS A');
    this.props.setResponseTime(responseTime)
 }
    handlePersonalPhonerData(){this.setState({PareaCode: this.refs.PareaCode.value, PphoneNumber: this.refs.PphoneNumber.value})}
    handleMobilePhonerData(){this.setState({MareaCode: this.refs.MareaCode.value, MphoneNumber: this.refs.MphoneNumber.value})}
    handleSubmit(event){
        if(this.state.PareaCode !== ''){
            event.preventDefault();
            return this.props.phoneNumberInformation(this.state)
        }
    }

    onMouseEnterHandler(event, disabled){ 
        disabled = true 
                let lang = locales.strings;
                let validationMsg = new Set();
                for (var key in this.state) {
                    if(key==='PareaCode' && ((this.props.validateAreaCode(this.state.PareaCode)) || (this.props.validatePhoneNumber(this.state.PphoneNumber)))){
                        if(!this.props.validateAreaCodeMandatory(this.state.PareaCode) || !this.props.validatePhoneNumberMandatory(this.state.PphoneNumber)){
                            validationMsg.add({key:key,firstMessage:lang.formatString(lang.InValidPhoneNumber),secondMessage:lang.formatString(lang.FormatPhoneNumber)})
                    } 
                }
                    if( key==='MareaCode' && ((this.props.validateAreaCode(this.state.MareaCode)) || (this.props.validatePhoneNumber(this.state.MphoneNumber)))){
                        if(!this.props.validateAreaCodeMandatory(this.state.MareaCode) || !this.props.validatePhoneNumberMandatory(this.state.MphoneNumber)){
                            validationMsg.add({key:key,firstMessage:lang.formatString(lang.InValidMobileNumber),secondMessage:lang.formatString(lang.FormatPhoneNumber)})
                    }     
                }
                let array = Array.from(validationMsg)
                let redirectTo;

                if (((this.state.PareaCode==='' || this.state.PareaCode===undefined) && (this.state.MareaCode==='' || this.state.MareaCode===undefined) && (this.state.PphoneNumber===undefined || this.state.PphoneNumber==='') && (this.state.MphoneNumber ===undefined || this.state.MphoneNumber==='' ))||(array.length<=0 && (this.state.PareaCode==='' && this.state.MareaCode==='' && this.state.PphoneNumber==='' && this.state.MphoneNumber===''))||(!array.length<=0)){   
                    disabled = true
                    redirectTo = 'PhoneNumber'
                } 
                else{
                    disabled= false 
                    redirectTo = 'InformationPage'
                }
                this.setState({errorMessages:array,redirectTo:redirectTo, disabled: disabled})
                }
            }
    
    render(){
        let lang=locales.strings;
        let PersonalPhoneData = {
            areaCode : this.state.PareaCode,
            phoneNumber : this.state.PphoneNumber,
            phoneType: 'PH1'
        }
        let MobilePhoneData = {
            areaCode : this.state.MareaCode,
            phoneNumber : this.state.MphoneNumber,
            phoneType: 'PH3'
        }
        let PhoneData = {
            PersonalPhoneData : PersonalPhoneData,
            MobilePhoneData : MobilePhoneData,
            contactType: 'PHONE'
        }
        return(
            <div className="container">
                <SecondaryHeader HeadingName={lang.headingLabel} homeLink = 'No'/>
                <div className="blockUnderline"></div>
                    <form ref='volunteer_form' onSubmit={this.handleSubmit.bind(this)}  style={{padding:"10px"}}>
                    <ErrorMessage errors={this.state.errorMessages}/>
                        <div className="row formSpace-bottom addIncomeFormDivStyle">
                        <div className="col-md-2 col-sm-12 col-xs-12">
                            <label>{lang.personalLabel}</label>
                        </div>
                        <div className="col-md-2 col-sm-12 col-xs-12 formSpace-bottom addIncomeFormDivStyle centerAlignStyle">
                            <input name="PareaCode" value={this.state.PareaCode} ref="PareaCode" type="text" maxLength="3" className="form-control" id="PareaCode" onChange={this.handlePersonalPhonerData.bind(this)} required />
                        </div>
                        <div className="col-md-4 col-sm-12 col-xs-12 centerAlignStyle">
                            <input name="PphoneNumber" value={this.state.PphoneNumber} ref="PphoneNumber" type="text" maxLength="7" className="form-control" id="PphoneNumber" onChange={this.handlePersonalPhonerData.bind(this)} required />
                        </div>
                        </div>
                        <div className="row formSpace-bottom addIncomeFormDivStyle">
                        <div className="col-md-2 col-sm-12 col-xs-12">
                            <label>{lang.mobileLabel}</label>
                        </div>
                        <div className="col-md-2 col-sm-12 col-xs-12 formSpace-bottom addIncomeFormDivStyle centerAlignStyle">
                            <input name="MareaCode" value={this.state.MareaCode} ref="MareaCode" type="text" maxLength="3" className="form-control" id="MareaCode" onChange={this.handleMobilePhonerData.bind(this)} required />
                        </div>
                        <div className="col-md-4 col-sm-12 col-xs-12 centerAlignStyle">
                            <input name="MphoneNumber" value={this.state.MphoneNumber} ref="MphoneNumber" type="text" maxLength="7" className="form-control" id="MphoneNumber" onChange={this.handleMobilePhonerData.bind(this)} required />
                        </div>
                        </div>
                        <div style={{marginBottom: 20}}></div>
                        <div className="row addIncomeFormDivStyle">
                            <div className="col-md-11 col-sm-6 col-xs-6">
                            <ButtonFunctionality ButtonName={lang.ButtonCancel} redirectTo="InformationPage" dstClassName="btn button-text buttonBack1"/>
                            </div>
                            <div className="col-md-1 col-sm-6 col-xs-6 buttonAlignRight" onMouseEnter={this.onMouseEnterHandler.bind(this,this.state.disabled)}>
                            <ButtonFunctionality ButtonName={lang.ButtonSave} redirectTo="ProcessingContactInformation" disabled={this.state.disabled} dstClassName="btn buttonBack1 marginLeftForButtons" data= {PhoneData}/>            
                            </div> 
                        </div>
                    </form>
            </div>
        )
    }
}
function mapStateToProps(store) {
    return {
        phoneNumberResponse: store.phoneNumber,
        pageDetails: store.pageDetailsReducer
    };
}


export default connect(mapStateToProps,{phoneNumberInformation,validatePhoneNumber,validateAreaCode,validatePhoneNumberMandatory,validateAreaCodeMandatory,addPageLoggingInfo1,setSessionTime,setRequestTime,setResponseTime,setStartSessionTime})(PhoneNumber);