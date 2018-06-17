import React from 'react'
import '../../../CSS/App.css'
import '../../../CSS/App-DesktopsScreen.css'
import ButtonFunctionality from '../../../ClickFunc/ButtonFunctionality'
import * as locales from '../../workActivityDetailsScreenProperties'


export default class BottomComponent extends React.Component{
    constructor(props){        
        super(props);
        this.state={
            errorMessages:[],      
            StudentPageRedirectTo:"StudentPage",
            JobSearchRedirectTo:'JobSearch',
            JobSearchTrainingDisplayText:'JobSearchTrainingProgram',
            IVolunteerDisplayText:'IVolunteer',
            SNAPDisplayText:'SNAPWorkPlan',
            HealthEducationRedirectTo:'HealthEducationClass' ,
            disabled:false         
        }
    }        
    onMouseEnterHandlerPendingApp(event){ 
            let lang = locales.strings 
            let set = new Set();
            if (this.props.isPendingApp === 'Yes') {
                set.add({ key: 1, firstMessage: lang.pendingApplication, secondMessgae: lang.Blank })
            }
            let array = Array.from(set)
            let StudentPageRedirectTo = array.length <= 0 ? 'StudentPage' : 'ExemptionsWorkActivitiesPage'
            let JobSearchRedirectTo= array.length <= 0 ?'JobSearch': 'ExemptionsWorkActivitiesPage'
            let JobSearchTrainingDisplayText =array.length <= 0 ?'JobSearchTrainingProgram': 'ExemptionsWorkActivitiesPage'
            let IVolunteerDisplayText =array.length <= 0 ?'IVolunteer': 'ExemptionsWorkActivitiesPage'
            let SNAPDisplayText =array.length <= 0 ?'SNAPWorkPlan': 'ExemptionsWorkActivitiesPage'
            let HealthEducationRedirectTo =array.length <= 0 ?'HealthEducationClass': 'ExemptionsWorkActivitiesPage'
            let disabled =array.length <= 0 ?false:true

            this.setState({ errorMessages: array, StudentPageRedirectTo: StudentPageRedirectTo,JobSearchRedirectTo:JobSearchRedirectTo,
                JobSearchTrainingDisplayText:JobSearchTrainingDisplayText,
                IVolunteerDisplayText:IVolunteerDisplayText,
                SNAPDisplayText:SNAPDisplayText,
                HealthEducationRedirectTo:HealthEducationRedirectTo,disabled:disabled})
                this.props.ErrorMessageBottom(array)
        }

    render(){
        return(
            <div>
                <ButtonFunctionality ButtonName="I work" displayText="IncomeDetailsPage" dstClassName="btn btn-block responsive-width"/>
                <div onMouseEnter={this.onMouseEnterHandlerPendingApp.bind(this)} className="WorkComponent">
                <ButtonFunctionality ButtonName="I go to school, vocational training, or job training" displayText="" disabled={this.state.disabled} redirectTo={this.state.StudentPageRedirectTo} dstClassName="btn btn-block responsive-width"/>                
                <ButtonFunctionality ButtonName="I participate in job search" displayText="" redirectTo={this.state.JobSearchRedirectTo} disabled={this.state.disabled} dstClassName="btn btn-block responsive-width"/>
                <ButtonFunctionality ButtonName="I participate in job search training" displayText={this.state.JobSearchTrainingDisplayText} disabled={this.state.disabled} dstClassName="btn btn-block responsive-width"/>
                <ButtonFunctionality ButtonName="I volunteer" displayText={this.state.IVolunteerDisplayText} disabled={this.state.disabled} dstClassName="btn btn-block responsive-width"/>
                <ButtonFunctionality ButtonName="I am compliant with my SNAP work plan" displayText={this.state.SNAPDisplayText} disabled={this.state.disabled} dstClassName="btn btn-block responsive-width"/>
                <ButtonFunctionality ButtonName="I go to health education class" displayText="" redirectTo={this.state.HealthEducationRedirectTo} disabled={this.state.disabled} dstClassName="btn btn-block responsive-width"/>                  
            </div>
            </div>
        );
    }
}