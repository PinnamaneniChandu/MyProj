import React from 'react';
import '../../CSS/App.css';
import '../../CSS/App-DesktopsScreen.css'
import heroImage from '../../assets/hero.jpg';
import { connect } from 'react-redux'
import { addVolunteerInformation } from '../../actions/VolunteerAction'

export default class ErrorMessage extends React.Component{
    
    renderErrors(errors){
        return errors.map((mess,index)=>{
            return(
               <li style={{color: '#666666', fontSize: '1em', lineHeight: '1.5em', margin: '0px'}} key={index}>{mess.firstMessage} {mess.secondMessage}</li>
            )
        })
    }
    render(){
      let messages=this.renderErrors(this.props.errors), errorMessageDisplay
      if(messages.length > 0){
        errorMessageDisplay = <div aria-live="assertive" className="messages-container" id="ieg-error-messages" tabIndex="0">
        <span style={{fontWeight: 'bold'}}>Please correct the following errors before proceeding.</span>
        {messages}
        </div>
      }else{
          errorMessageDisplay = ''
      }
        return(
            <div>
            {errorMessageDisplay}
            </div>
        );
    }
}
