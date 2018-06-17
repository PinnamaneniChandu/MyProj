import React, { Component  } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {authUser, getServerDate,getServerDateAvailable,fillServerFormattedDate,getPendingAppDetails,formatPendingAppDetails} from '../actions/authUserAction'
import { getFormattedDate } from '../actions/CommonActions'
import moment from 'moment-es6'


function FilterWrapper(ComposedFilter, filterInfo) {
  class BaseFilter extends Component {
    constructor(props) {
      super(props);    
      this.state={
        isPendingApp:''
      }  
      if(this.props.pendingApp.pendingAppDetails===undefined){
        this.props.getPendingAppDetails()
      }      
    }
    
    componentWillMount() {
    this.props.authUser()
    this.props.getServerDate()      
    let formattedDate =this.props.serverDate!==undefined ||this.props.serverDate!=="" ?this.props.getServerDateAvailable(this.props.serverDate):undefined    
    if(formattedDate){
      this.props.fillServerFormattedDate(formattedDate)
    }
    if(this.props.userName !== 'unauthenticated'){
      if((!this.props.isAuth|| this.props.userName === 'unauthenticated') && !window.location.host==='localhost:3000')
        {
          this.props.history.push('/');
        }         
      }
    }
    

    render() {
      let isPendingApp =this.props.pendingApp.pendingAppDetails!==undefined ||this.props.pendingApp.pendingAppDetails!=="" ?this.props.formatPendingAppDetails(this.props.pendingApp.pendingAppDetails):undefined        
      return(
        <div className="filterDetailsWrapper">
            <ComposedFilter
              {...this.state}
              {...this.props} 
              userName={this.props.userName}
              serverDate={this.props.fomatedServerDate}
              isPendingApp={isPendingApp}
              />
        </div>
      );
    }
  }

  function mapStateToProps(store) {
    return {
      isAuth: store.authUser,
      isAuth: store.auth.userDetails.isAuth,
      userName: store.auth.userDetails.userName,
      serverDate: store.serverDate.serverDate,
      fomatedServerDate: store.serverDate.fomatedServerDate,
      pendingApp: store.pendingApp
    };
  }

  return connect(mapStateToProps,{authUser,getServerDate, getFormattedDate, getServerDateAvailable, fillServerFormattedDate,getPendingAppDetails,formatPendingAppDetails})(BaseFilter);
}
export default FilterWrapper;