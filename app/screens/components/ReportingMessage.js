import React from 'react';
import '../../CSS/App.css';
import '../../CSS/App-DesktopsScreen.css'
import heroImage from '../../assets/hero.jpg';
import { connect } from 'react-redux'
import { addVolunteerInformation } from '../../actions/VolunteerAction'
import {getFormattedDate} from '../../actions/CommonActions'

class ReportingMessage extends React.Component{

    rendMessages(messages, userName){
        let totalM=[]
        messages.map((message)=>{
            let firstMessage;
            let secondMessage
            if(message.evidenceType==='EEFDET0024'){
                firstMessage='Removed Member'
                secondMessage= ' - '.concat(message.name).concat(' , ').concat(this.props.getFormattedDate(message.dateOfBirth))
            } else  if(message.evidenceType==='EEFDET0021'){
                firstMessage= userName
                secondMessage= ' '.concat('participated in job search activities')
            } else  if(message.evidenceType==='EEFDET0017'){
                firstMessage= userName
                secondMessage= ' '.concat('is caring for').concat(' ').concat(message.incapacitatedPersonName)
            } else  if(message.evidenceType==='EEFDET0019'){
                firstMessage= userName
                secondMessage= ' '.concat('volunteered at').concat(' ').concat(message.organizationName)
            } else  if(message.evidenceType==='EEFDET0016'){
                firstMessage= userName
                secondMessage= ' '.concat('is in an alcohol or drug treatment program')
            } else if(message.evidenceType==='EEFDET0020'){
                firstMessage= userName
                secondMessage= ' took health education class: '.concat(message.className).concat('.')
            } else if(message.evidenceType==='DET0026008'){
                firstMessage=userName
                secondMessage= ' is pregnant with due date of '.concat(this.props.getFormattedDate(message.dueDate)).concat('.')
            }else if(message.evidenceType==='EEFDET0025'){
                firstMessage=userName
                secondMessage= ' is compliant with SNAP work plan. '
            }else if(message.evidenceType==='EEFDET0018'){
                firstMessage=userName
                secondMessage=' '.concat('participated in job search training at ').concat(message.programName)
            }else if(message.evidenceType==='DET0026007'){
                firstMessage=userName
                secondMessage=' '.concat('is going to school,vocational or job training at ').concat(message.schoolOrganizationName)
            }else if(message.evidenceType==='DET0026010'){
                firstMessage=userName
                secondMessage=''
                if(message.disabilityType==='DT1'){
                    secondMessage= ' is blind'
                }else if(message.disabilityType==='DT26301'){
                    secondMessage= ' needs help with daily activities'
                }else if(message.disabilityType==='DT2'){
                    secondMessage= ' has a disability'
                }else if(message.disabilityType==='EEFDT2'){
                    secondMessage= ' has a short-term disability'
                }
            }
            else if(message.evidenceType==='EEFDET0022' && message.employerName !== 'N/A'){
                firstMessage='Added New Income Received - '
                secondMessage=message.incomeTypeName.concat(', ').concat(message.employerName).concat(', $').concat((Number(message.amount)).toFixed(2)) 
                }
            else if(message.evidenceType==='EEFDET0022' && message.employerName === 'N/A'){    
                firstMessage='Added New Income Received - '
                secondMessage=message.incomeTypeName.concat(', $').concat((Number(message.amount)).toFixed(2)) 
                
            }      
            else if(message.evidenceType==='EEFDET0023'){
                firstMessage='Added a Child - '
                secondMessage=message.firstName.concat(' ').concat(message.lastName).concat(' - ').concat(this.props.getFormattedDate(message.dateOfBirth)).concat('.')
            }
            else if(message.evidenceType==='DET0026030' && message.page==='EndIncome'){
                    firstMessage='End Income - '
                    secondMessage=message.incomeTypeName
            }
            else if(message.evidenceType==='DET0026030' && message.employerName !== 'N/A'){
                    firstMessage='Added New Income Source - '
                    secondMessage=message.incomeTypeName.concat(', ').concat(message.employerName).concat(', $').concat((Number(message.amount)).toFixed(2))  
            }
            else if(message.evidenceType==='DET0026030' && message.employerName === 'N/A'){
                firstMessage='Added New Income Source - '
                secondMessage=message.incomeTypeName.concat(', $').concat((Number(message.amount)).toFixed(2)) 
            }     
            totalM.push(firstMessage.concat(secondMessage))
        })
        return totalM.map((mess,index)=>{
            return(
            <li key={index}>{mess}</li>
            )
        })
    }
    render(){
        
        let userName = this.props.userName
        let messages=this.rendMessages(this.props.messages, userName)
        return(
            <div>
            {messages}
            </div>
        );
    }
}
function mapStateToProps(store) {
    return {
    volunteerResponse: store.volunteer
    };
}


export default connect(mapStateToProps,{addVolunteerInformation, getFormattedDate})(ReportingMessage);