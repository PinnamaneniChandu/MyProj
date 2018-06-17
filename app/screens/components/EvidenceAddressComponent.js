import React from 'react'
import '../../CSS/App.css'
import '../../CSS/App-DesktopsScreen.css'
import astrisk from '../../assets/astrisk.png'
import inputtextField from '../../utilities/InputFiled'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import {connect} from 'react-redux'
import {getCTDetails} from '../../actions/CTAction'
import  * as locales from '../../screens/components/EvidenceAddressProperties'

class EvidenceAddressComponent extends React.Component{
  constructor(props){        
    super(props);
    if(this.props.addressData)
      {
        this.state={
        street1:this.props.addressData.street1,
        street2:this.props.addressData.street2,
        city:this.props.addressData.city,
        state:this.props.addressData.state,
        zip:this.props.addressData.zip,
        zipCodeExt:this.props.addressData.zipCodeExt,
        }
      }
      else{
    this.state={street1:"",street2:"",city:"",state:"",zip:"", zipCodeExt: ''}
  }
}
  handleAddressData(e){
    var data={
      street1: this.refs.street1.value,
      street2:this.refs.street2.value,
      city: this.refs.city.value,
      state: this.refs.state.value,
      zip: this.refs.zip.value,
      zipCodeExt: this.refs.zipCodeExt.value,
    }
      this.setState({
      street1: this.refs.street1.value,
      street2:this.refs.street2.value,
      city: this.refs.city.value,
      state: this.refs.state.value,
      zip: this.refs.zip.value,
      zipCodeExt: this.refs.zipCodeExt.value,
      });   
      this.props.EvidenceAddressComponentValues(data)      
  }
    render(){
        let lang=locales.strings;
        let stateCodes=this.props.getCTDetails(this.props.CTReducer.CTList,'AddressState')
        return(
          <div>
            <div className="row addIncomeFormDivStyle">
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <label>{lang.street1}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                </div>
                <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle">
                <input name="street1" value={this.state.street1} ref="street1" type="text" title={lang.street1} className="form-control" id="street1" onChange={this.handleAddressData.bind(this)} required />
                </div>
            </div>
            <div className="row addIncomeFormDivStyle">
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <label className = "Labels">{lang.street2}</label>
                </div>
                <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle">
                <input name="street2" value={this.state.street2} ref="street2" type="text" title={lang.street2} className="form-control" id="street2" onChange={this.handleAddressData.bind(this)} required/>
                </div>
            </div>
            <div className="row addIncomeFormDivStyle">
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <label className = "Labels">{lang.City}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                </div>
                <div className="col-md-8 col-sm-12 col-xs-12 centerAlignStyle">
                <input name="city" value={this.state.city} ref="city" type="text" title={lang.City} className="form-control" id="city" onChange={this.handleAddressData.bind(this)} required />
                </div>
            </div>
            <div className="row addIncomeFormDivStyle">
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <label className = "Labels">{lang.State}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                </div>
                <div className="col-md-8 col-sm-12 col-xs-12  selectDropDownArrowStyle">
                <select value={this.state.state} name="state" ref="state" type="select" title={lang.State} className="form-control" id="state" onChange={this.handleAddressData.bind(this)} required>
                <option defaultValue>--Please Select--</option>
                  {stateCodes}
                </select> 
                </div>
            </div>
            <div className="row addIncomeFormDivStyle">
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <label className = "Labels">{lang.ZipCode}<span><img alt="Mandatory" className="verticalAlign" src={astrisk} style={{verticalAlign:'top'}}></img></span></label>
                </div>
                <div className="col-md-8 col-sm-12 col-xs-12 zipAlignStyle">
                  <div className="col-md-6 col-sm-6 col-xs-6">
                    <input value={this.state.zip} name="zip" ref="zip" type="text" title={lang.ZipCode} maxLength='5' className="form-control" id="zip" onChange={this.handleAddressData.bind(this)} required/>              
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-6">
                    <label className="visuallyhidden"></label>
                    <input value={this.state.zipCodeExt} name="zipCodeExt"  maxLength='4' ref="zipCodeExt" type="text" title="Zip Code Extension" className="form-control" id="zipCodeExt" onChange={this.handleAddressData.bind(this)} required/>
                  </div>
                </div>
            </div>
          </div>
        )
    }
}

function mapStateToProps (store) {return{CTReducer : store.CTReducer}}
export default connect(mapStateToProps, {getCTDetails})(EvidenceAddressComponent)