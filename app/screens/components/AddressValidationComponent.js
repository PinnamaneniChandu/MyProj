import React from 'react'
import ButtonFunctionality from '../../ClickFunc/ButtonFunctionality'
import AnchorFunctionality from '../../ClickFunc/AnchorFunctionality'
import {getCTDescription} from '../../actions/CTAction.js'
import { connect } from 'react-redux'

class AddressValidationComponent extends React.Component{
    render(){  
        let address =  this.props.data, anchorTag, isNotDisabled, countyValue, codeTablesListData, countyDescription
        countyValue = address.USCOUNTY
        codeTablesListData = this.props.codeTableValue.CTList
        countyDescription = this.props.getCTDescription(codeTablesListData, 'AddressUSCounty', countyValue)
        isNotDisabled = this.props.checkValue
        let data=
        {
            address :  this.props.data,
            members : this.props.members,
            contactType: this.props.contactType
        }
        
        if(isNotDisabled === 'true' || this.props.data.addressType==='AT1' || this.props.data.addressType==='AT4'){
            anchorTag = <AnchorFunctionality AnchorText="Use this" redirectTo="ProcessingContactInformation" dstClassName='' data={data} />
        }else if((isNotDisabled === 'false' && (this.props.data.addressType==='AT1' || this.props.data.addressType==='AT4')) || (isNotDisabled === 'false' && address.hasValue === 'false' && (this.props.data.addressType==='AT1' || this.props.data.addressType==='AT4'))){
            anchorTag = ''
        }
        let addressDisplay
        if((address.ADD2 !== undefined || address.ADD3 !== undefined ) && address.CITY !== undefined && address.USCOUNTY !== undefined && address.STATE !== undefined && (address.ZIP !== undefined || address.ZIPCODEPLUSFOUR !== undefined)){
            addressDisplay=''
            if(address.ADD2 !==''){
                addressDisplay = addressDisplay+''+address.ADD2+',' 
            }
            if(address.ADD3 !=='' && address.ADD3 !== undefined){
                addressDisplay = addressDisplay+''+address.ADD3+',' 
            }else{
                addressDisplay = addressDisplay+''+''
            }
            if(address.CITY !==''){
                addressDisplay = addressDisplay+''+address.CITY+',' 
            }
            if(address.USCOUNTY !==''){
                addressDisplay = addressDisplay+''+countyDescription+',' 
            }
            if(address.STATE !==''){
                addressDisplay = addressDisplay+''+address.STATE+',' 
            }            
            if(address.ZIP !==''){
                addressDisplay = addressDisplay+''+address.ZIP 
            }
            if(address.ZIPCODEPLUSFOUR !=='' && address.ZIPCODEPLUSFOUR !== undefined){
                addressDisplay = addressDisplay+'-'+address.ZIPCODEPLUSFOUR 
            }else{
                addressDisplay = addressDisplay
            }
        // addressDisplay = <p>{address.ADD2}, {address.ADD3}, {address.CITY}, {address.STATE}, {countyDescription}, {address.ZIP}</p>
        }else{
            addressDisplay = "No suggested address available" 
        }
        return(           
            <div style={{ paddingBottom:"2pc"}}>
                <div className="row">
					<div className="col-md-3 col-sm-4 col-xs-4 Labels" style={{ fontWeight: "bold"}}>{this.props.displayText}</div>
					<div className="col-md-6 col-sm-6 col-xs-6 wrapText" >{addressDisplay}</div>
					<div className="col-md-3 col-sm-2 col-xs-2 centerAlignStyle">
						{/*<AnchorFunctionality AnchorText="Use this" redirectTo="InformationPage" dstClassName='' data={data} />*/}
						{anchorTag}
					</div>
                </div>               
            </div>
        )
    }
}
function mapStateToProps (state) {
    return{
        codeTableValue:state.CTReducer
    }
}

export default connect(mapStateToProps, {getCTDescription})(AddressValidationComponent)

