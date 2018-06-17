import React from 'react'
import { connect } from 'react-redux';
import {addCT} from '../../actions/CommonActions'
import {getCTInfo} from '../../actions/CommonActions'

class LoadCT extends React.Component{
    componentWillMount()
    {
        /* let getCTInfo=this.props.getCTInfo;
        this.props.getCTList('CT:AddressState')
        console.log(this.props.CTReducer)
        this.props.addCT(this.props.CTReducer.localCTList,'STATE',getCTInfo(this.props.CTReducer))
        this.props.getCTList('CT:AddressUSCounty')
        console.log(this.props.CTReducer.CTList)
        this.props.addCT(this.props.CTReducer.localCTList,'COUNTY',getCTInfo(this.props.CTReducer))
        console.log(this.props) */
    }
    render(){
        return(
            <div>
            </div>
        )
    }
}
function mapStateToProps (store) {
    return{
        CTReducer : store.CTReducer,
    }
}
export default connect(mapStateToProps, {addCT,getCTInfo})(LoadCT)