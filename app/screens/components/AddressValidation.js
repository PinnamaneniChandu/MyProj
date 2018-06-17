import React from 'react'
import ButtonFunctionality from '../../ClickFunc/ButtonFunctionality'
export default class AddressValidationComponent extends React.Component{
    render(){
        return(
            <div className="form_Border" style={{ padding:"3% 3%"}}>
                <h4>Our sources suggest that your address may not be correct. Please follow the directions below</h4>
                <div style={{marginBottom: 20}}></div>
                <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-6">{this.props.EnteredAddress}</div>
                    <div className="col-md-6 col-sm-6 col-xs-6">456 Central Ave. Little Rock, AR 72206</div>
                    <div className="col-md-2 col-sm-2 col-xs-12 centerAlignStyle"><a>Use this</a></div>
                </div>
                <div style={{marginBottom: 20}}></div>
                <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-6">{this.props.SuggestedAddress}</div>
                    <div className="col-md-6 col-sm-6 col-xs-6">456 Central Ave. Little Rock, AR 72206</div>
                    <div className="col-md-2 col-sm-2 col-xs-12 centerAlignStyle"><a>Use this</a></div>
                </div>
                <div style={{marginBottom: 20}}></div>
                <div className="centerAlignStyle">
                    <ButtonFunctionality ButtonName="Edit entered address" displayText="MonthlyBack" dstClassName="btn btn-secoundary button-text buttonBack1"/>
                </div>
            </div>
        )
    }
}