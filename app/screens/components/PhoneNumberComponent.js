import React from 'react'
import '../../CSS/App.css'
import '../../CSS/App-DesktopsScreen.css'
import inputtextField from '../../utilities/InputFiled'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import  * as locales from '../../screens/components/PhoneNumber_Language'
import astrisk from '../../assets/astrisk.png'

export default class PhoneNumberComponent extends React.Component{
  constructor(props){        
    super(props);
    if(this.props.PhoneData.areaCode !== "" || this.props.PhoneData.phoneNumber !== "")
      {
        this.state={
        areaCode:this.props.PhoneData.areaCode,
        phoneNumber:this.props.PhoneData.phoneNumber
        }
      }
      else{
    this.state={areaCode:"",phoneNumber:""}
  }
}
handlePhoneNumberData(){
  var PhoneNumberInformation = {
    areaCode: this.refs.areaCode.value,
    phoneNumber: this.refs.phoneNumber.value
  }
  this.setState({
    areaCode: this.refs.areaCode.value,
    phoneNumber:this.refs.phoneNumber.value
    });
  this.props.PhoneNumberComponentValues(PhoneNumberInformation)
}
    render(){
        let lang=locales.strings;
        const phoneType=this.props.phoneType?this.props.phoneType:""  
        let isMandatory = this.props.isMandatory?'':<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span>
        return(
          <div>
            <div className="row formSpace-bottom" style={{marginBottom:'8px'}}>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <label>{lang.AreaCode}{isMandatory}</label>
              </div>
              <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle">
                <input name="areaCode" value={this.state.areaCode} ref="areaCode" type="text" title={lang.AreaCode} maxLength="3" className="form-control" id="areaCode" onChange={this.handlePhoneNumberData.bind(this)} required  />
              </div>
            </div>
          <div className="row formSpace-bottom" style={{marginTop:'18px', marginBottom: '18px'}}>
            <div className="col-md-4 col-sm-12 col-xs-12">
            <label>{phoneType} {lang.PhoneNumber}{isMandatory}</label>
            </div>
            <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle">
            <input name="phoneNumber" value={this.state.phoneNumber} ref="phoneNumber" type="text" title={lang.PhoneNumber} maxLength="7" className="form-control" id="phoneNumber" onChange={this.handlePhoneNumberData.bind(this)} required  />
            </div>
          </div>
        </div>
        )
    }
}
