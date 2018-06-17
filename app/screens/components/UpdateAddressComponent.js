import React from 'react'
import '../../CSS/App.css'
import '../../CSS/App-DesktopsScreen.css'
import {connect} from 'react-redux'
import {getCTDetails} from '../../actions/CTAction'
import  * as locales from '../../screens/components/UpdateAddressComponent_Language'
import ButtonFunctionality from '../../ClickFunc/ButtonFunctionality.js'
import ErrorMessage from './ErrorMessage'
import astrisk from '../../assets/astrisk.png'
import {validateStreet1,validateCity,validateState,validateZipCode,validatePhoneNumber,validateAreaCode,validateTEMPORARY,validateAreaCodeMandatory,validatePhoneNumberMandatory,validateZipCodeMandatory} from '../../actions/CommonValidationActions'

class UpdateAddressComponent extends React.Component{
  constructor(props){        
    super(props);
    if(this.props.addressData)
      {
        let ZipCode, ZipCodeExt, ZipCodeWithEXT
        if(this.props.addressData.ZIP !== '' && this.props.addressData.ZIP !== undefined ){
          ZipCodeWithEXT = this.props.addressData.ZIP.split('-')
          ZipCode = ZipCodeWithEXT[0]
          ZipCodeExt = ZipCodeWithEXT[1]
        }
        this.state={
        ADD2:this.props.addressData.ADD2,
        ADD3:this.props.addressData.ADD3,
        CITY:this.props.addressData.CITY,
        USCOUNTY:this.props.addressData.USCOUNTY,
        STATE:this.props.addressData.STATE,
        ZIP:ZipCode,
        ZIPCODEPLUSFOUR:ZipCodeExt,
        disabled:'',
        errorMessages:[],
        TEMPORARILY: this.props.addressData.TEMPORARILY
        }
      }
      else{
    this.state={ADD2:"",ADD3:"",CITY:"",STATE:"",ZIP:"",USCOUNTY:"", TEMPORARILY: '', ZIPCODEPLUSFOUR: ''}
  }
}

componentWillMount() {
  
}
handleTempData(e){
  this.setState({TEMPORARILY: this.refs.TEMPORARILY.value})
  this.props.AddressComponentValues(this.state)
}
handleADD2Data(e){
  this.setState({
    ADD2: this.refs.ADD2.value
  })
  this.props.AddressComponentValues(this.state)   
}
handleADD3Data(e){
  this.setState({ADD3: this.refs.ADD3.value,})
  this.props.AddressComponentValues(this.state)   
}
handleCITYData(e){this.setState(
  {CITY: this.refs.CITY.value})
  this.props.AddressComponentValues(this.state)   
}
handleUSCOUNTYData(e){this.setState(
  {USCOUNTY: this.refs.USCOUNTY.value})
  this.props.AddressComponentValues(this.state)   
}
handleZipData(e){
  this.setState({ZIP: this.refs.ZIP.value})
this.props.AddressComponentValues(this.state)   
}
handleStateData(e){
  this.setState({STATE: this.refs.STATE.value})
  this.props.AddressComponentValues(this.state)   
}
handleZipExtData(e){
  this.setState({ZIPCODEPLUSFOUR: this.refs.ZIPCODEPLUSFOUR.value})
this.props.AddressComponentValues(this.state)   
}


componentDidMount() {
  let finaldata={
    ADD2: this.state.ADD2,
    ADD3:this.state.ADD3,
    CITY: this.state.CITY,
    STATE: this.state.STATE,
    ZIP: this.state.ZIP,
    ZIPCODEPLUSFOUR:this.state.ZIPCODEPLUSFOUR,
    USCOUNTY: this.state.USCOUNTY,
    TEMPORARILY: this.state.TEMPORARILY
  }
  this.props.AddressComponentValues(finaldata)   
}
handleEnterKeyPress(e) {
  if(e.which === 13 || e.which === 17){
      e.target.blur();
  }
  return false;
}
handleSubmit(e){
  e.preventDefault();
}
onMouseEnterHandler(event){  
  let lang=locales.strings;
  let validationMsg = new Set();
  for (var key in this.state) {
  if(key==='ADD2' && this.props.validateStreet1(this.state['ADD2'])){
      validationMsg.add({key:key,firstMessage:lang.formatString(lang.ADD2),secondMessage:lang.formatString(lang.IsMandatory)})   
  }
  if(key==='CITY' && this.props.validateCity(this.state['CITY'])){
    validationMsg.add({key:key,firstMessage:lang.formatString(lang.CITY),secondMessage:lang.formatString(lang.IsMandatory)})  
  }
  if(key==='STATE' && this.props.validateState(this.state['STATE'])){
    validationMsg.add({key:key,firstMessage:lang.formatString(lang.STATE),secondMessage:lang.formatString(lang.IsMandatory)})    
  }
  if((this.state.STATE!=='AR') && (key==='TEMPORARILY' && (this.state.TEMPORARILY=== '--Please Select--' || this.state.TEMPORARILY=== undefined))){ 
    validationMsg.add({key:key,firstMessage:lang.formatString(lang.TEMPORARILY),secondMessage:lang.formatString(lang.IsMandatory)})
  }  
  if(key==='USCOUNTY' && this.props.validateState(this.state['USCOUNTY'])){
    validationMsg.add({key:key,firstMessage:lang.formatString(lang.USCOUNTY),secondMessage:lang.formatString(lang.IsMandatory)}) 
  }
  if((key==='ZIP' && (this.props.validateZipCodeMandatory(this.state['ZIP'])))){
    validationMsg.add({key:key,firstMessage:lang.formatString(lang.ZIP),secondMessage:lang.formatString(lang.IsMandatory)}) }
          else if ((key==='ZIP' && (this.props.validateZipCode(this.state['ZIP'])))) {
            validationMsg.add({key:key,firstMessage:lang.formatString(lang.ZIPVALID),secondMessage:lang.formatString(lang.ZIPFORMAT)})          
  }
  if((key==='ZIPCODEPLUSFOUR' && this.state['ZIPCODEPLUSFOUR'] !== undefined) && (this.state['ZIPCODEPLUSFOUR'].length > 0 && this.state['ZIPCODEPLUSFOUR'].length < 4)){
            validationMsg.add({key:key,firstMessage:lang.formatString(lang.ZIPVALID),secondMessage:lang.formatString(lang.ZIPFORMAT)})          
  }
}
let array = Array.from(validationMsg)
let redirectTo;
let disabled;
if (array.length<=0){
    disabled = false   
    redirectTo = 'UpdateProcessingPage'
} else{
    disabled= true 
    redirectTo = 'UpdateAddressComponent'
}
this.setState({errorMessages:array,redirectTo:redirectTo,disabled:disabled})
}
    render(){
        let stateCodes=this.props.getCTDetails(this.props.CTReducer.CTList,'AddressState')
        let countyCodes=this.props.getCTDetails(this.props.CTReducer.CTList,'AddressUSCounty')
        let ifNotArkansas;
        let lang=locales.strings;
        if(this.state.STATE !== 'AR' && this.state.STATE !== undefined && this.state.STATE !== '--Please Select--' ){
          ifNotArkansas = <div className="row addIncomeFormDivStyle">
                            <div className="col-md-4 col-sm-12 col-xs-12">
                              <label>{lang.TEMPORARILY}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                            </div>
                            <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle">
                              <select value={this.state.TEMPORARILY} name="TEMPORARILY" ref="TEMPORARILY" type="select" className="form-control" id="TEMPORARILY" onChange={this.handleTempData.bind(this)} onKeyPress={this.handleEnterKeyPress} onBlur={()=>{this.setState({TEMPORARILY:this.state.TEMPORARILY})}}>
                                <option defaultValue='--Please Select--'>--Please Select--</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select> 
                            </div>
                          </div>
        }
let addressData = {
  ADD2: this.state.ADD2,
  ADD3:this.state.ADD3,
  CITY: this.state.CITY,
  STATE: this.state.STATE,
  ZIP: this.state.ZIP,
  ZIPCODEPLUSFOUR:this.state.ZIPCODEPLUSFOUR,
  USCOUNTY: this.state.USCOUNTY,
  TEMPORARILY: this.state.TEMPORARILY,
  addressType:this.props.addressData.addressType,
  evidenceType: this.props.addressData.evidenceType
}
let members =  this.props.membersList
        let personListAndAddress = {
          addressData: addressData,
          personList: members,
          contactType: 'ADDRESS'
        }
        return(
          <form ref='address_form' onSubmit={this.handleSubmit.bind(this)} >
          <ErrorMessage errors={this.state.errorMessages}/>
          <p className="required col-md-12 col-sm-12 col-xs-12">* Indicates a required field</p>
            <div className="row addIncomeFormDivStyle"> 
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <label>{lang.ADD2}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                </div>
                <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle">
                  <input name="ADD2" value={this.state.ADD2} ref="ADD2" type="text" className="form-control" id="ADD2" onChange={this.handleADD2Data.bind(this)} onKeyPress={this.handleEnterKeyPress} onBlur={()=>{this.setState({newEmail:this.state.ADD2})}}/>
                </div>
            </div>
          
            <div className="row addIncomeFormDivStyle">
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <label>{lang.ADD3}</label>
                </div>
                <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle">
                  <input name="ADD3" value={this.state.ADD3} ref="ADD3" type="text" className="form-control" id="ADD3" onChange={this.handleADD3Data.bind(this)} onKeyPress={this.handleEnterKeyPress} onBlur={()=>{this.setState({newEmail:this.state.ADD3})}}/>
                </div>
            </div>
          
            <div className="row addIncomeFormDivStyle">
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label>{lang.CITY}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
              </div>
              <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle">
                <input name="CITY" value={this.state.CITY} ref="CITY" type="text" className="form-control" id="CITY" onChange={this.handleCITYData.bind(this)} onKeyPress={this.handleEnterKeyPress} onBlur={()=>{this.setState({newEmail:this.state.CITY})}}/>
              </div>
            </div>
          
            <div className="row addIncomeFormDivStyle">
              <div className="col-md-4 col-sm-12 col-xs-12">
                  <label>{lang.STATE}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
              </div>
              <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle">
                <select value={this.state.STATE} name="STATE" ref="STATE" type="select" className="form-control" id="STATE" onChange={this.handleStateData.bind(this)} onKeyPress={this.handleEnterKeyPress} onBlur={()=>{this.setState({newEmail:this.state.STATE})}}>
                  <option defaultValue>--Please Select--</option>
                  {stateCodes}
                </select> 
              </div>
            </div>
          
            <div className="row addIncomeFormDivStyle">
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <label>{lang.ZIP}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                </div>
                <div className="col-md-4 col-sm-6 col-xs-6 centerAlignStyle">
                  <input value={this.state.ZIP} name="ZIP" ref="ZIP" type="text" maxLength='5' className="form-control" id="ZIP" onChange={this.handleZipData.bind(this)} onKeyPress={this.handleEnterKeyPress} onBlur={()=>{this.setState({newEmail:this.state.ZIP})}}/>
                </div>
                <div className="col-md-4 col-sm-6 col-xs-6 centerAlignStyle">
                <input value={this.state.ZIPCODEPLUSFOUR} name="ZIPCODEPLUSFOUR"  maxLength='4' ref="ZIPCODEPLUSFOUR" type="text" title="Zip Code Extension" className="form-control" id="ZIPCODEPLUSFOUR" onChange={this.handleZipExtData.bind(this)} onKeyPress={this.handleEnterKeyPress} onBlur={()=>{this.setState({newEmail:this.state.ZIPCODEPLUSFOUR})}}/>
              </div>
            </div>

            <div className="row addIncomeFormDivStyle">
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label>{lang.USCOUNTY}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
              </div>
              <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle">
                <select name="USCOUNTY" value={this.state.USCOUNTY} ref="USCOUNTY" type="select" className="form-control" id="USCOUNTY" onChange={this.handleUSCOUNTYData.bind(this)} onKeyPress={this.handleEnterKeyPress} onBlur={()=>{this.setState({newEmail:this.state.USCOUNTY})}}>
                  <option defaultValue>--Please Select--</option>
                  {countyCodes}
                </select> 
              </div>  
            </div>
          
            {ifNotArkansas}

            <div className="row addIncomeFormDivStyle">
              <div className="col-md-6 col-sm-6 col-xs-6">
                <ButtonFunctionality ButtonName="Cancel" redirectTo="UpdateContactInformationPage" dstClassName="btn button-text buttonBack1"/>
              </div>
              <div className="col-md-6 col-sm-6 col-xs-6 buttonAlignRight" onMouseOver={this.onMouseEnterHandler.bind(this)}>
                <ButtonFunctionality ButtonName="Save"  redirectTo={this.state.redirectTo} disabled={this.state.disabled} dstClassName="btn button-text buttonBack1" data={personListAndAddress}/>
              </div>
            </div>
        </form> 
        )
    }
}

function mapStateToProps (store) {return{CTReducer : store.CTReducer}}
export default connect(mapStateToProps, {getCTDetails,validateStreet1,validateCity,validateState,validateZipCodeMandatory,validateTEMPORARY,validateZipCode,validatePhoneNumber,validateAreaCode,validateAreaCodeMandatory,validatePhoneNumberMandatory})(UpdateAddressComponent)