import React from 'react';
import '../../../CSS/App.css'
import '../../../CSS/App-DesktopsScreen.css'
import AnchorFunctionality from '../../../ClickFunc/AnchorFunctionality.js'
import { connect } from 'react-redux'

class MonthlySummaryComponent extends React.Component{
    componentWillMount(){
    }
    renUnSubEvidences(){
if(this.props.evidences.list !== null){
        let removeDisplay
            return this.props.evidences.list.map((evidence,index)=>{    
             
                    if(evidence.evidenceName === 'Special Health Needs' && evidence.disabilityType !== 'DT2' && evidence.disabilityType !== 'EEFDT2'){
                        removeDisplay = <div className="col-md-6 col-sm-12 col-xs-12">
                        <div className="col-md-6 col-sm-6 col-xs-6">
                       <AnchorFunctionality AnchorText="Remove" redirectTo="RemoveExemption" dstClassName='' data={index}/>
                        </div>
                    </div>
                    }else{
                        let anchor = this.changeEvidence(evidence,index)
                        removeDisplay = <div className="col-md-6 col-sm-12 col-xs-12">
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            {anchor}
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">
						 <AnchorFunctionality AnchorText="Remove" redirectTo="RemoveExemption" dstClassName='' data={index}/>
                    </div>
                    </div>
                    }
                    return (<div key={index} className="monthlySummary-divStyle monthly-Summary-SummaryStyle">
                    <h4>{evidence.evidenceName}</h4>
                    <p>{evidence.displayLine1}</p>
                    <p>{evidence.displayLine2}</p>
                    <p>{evidence.displayLine2SecondRow}</p>
                    <p>{evidence.displayLine4}</p>
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <p>Status: Unsubmitted</p>
                        </div>
                        {removeDisplay}
                    </div>
                </div>)
                
                })
		}
    }

    changeEvidence(changeEvidence,index){
        let redirectTo
        redirectTo = changeEvidence.evidenceType === 'DET0026010'?"SpecialHealthNeeds":redirectTo        
        redirectTo = changeEvidence.evidenceType === 'DET0026008'?"PregnancyInformation":redirectTo
        redirectTo = changeEvidence.evidenceType === 'DET0026007'?"StudentPage":redirectTo
        redirectTo = changeEvidence.evidenceType === 'EEFDET0017'?"Incapacitated":redirectTo
        redirectTo = changeEvidence.evidenceType === 'EEFDET0016'?"Alcohol":redirectTo
        redirectTo = changeEvidence.evidenceType === 'EEFDET0021'?"JobSearch":redirectTo
        redirectTo = changeEvidence.evidenceType === 'EEFDET0018'?"JobSearchTrainingProgram":redirectTo
        redirectTo = changeEvidence.evidenceType === 'EEFDET0019'?"IVolunteer":redirectTo
        redirectTo = changeEvidence.evidenceType === 'EEFDET0025'?"SnapWorkPlan":redirectTo
        redirectTo = changeEvidence.evidenceType === 'EEFDET0020'?"HealthEducationClass":redirectTo
        redirectTo = changeEvidence.evidenceType === 'EEFDET0022'?"AddIncome":redirectTo
        redirectTo = changeEvidence.evidenceType === 'DET0026030' && changeEvidence.page!=='EndIncome'?"NewIncomeSourcePage":redirectTo
        redirectTo = changeEvidence.evidenceType === 'DET0026030' && changeEvidence.page==='EndIncome'?"EndIncome":redirectTo
        changeEvidence.index=index
        changeEvidence.updateFlag=true
        return <AnchorFunctionality AnchorText="Change"  redirectTo={redirectTo} data={changeEvidence}/>
    }
    removeEvidence(index){
        this.props.evidences.list.splice(index, 1)
        this.setState({})
    }
    submittedEvidence(otherEvd){
        return otherEvd.map((evidence,index)=>{
            let evdSubTypeAndEvidenceDesID = {
                subtype: evidence.subType,
                evidenceDescriptorID: evidence.evidenceDescriptorID
            }
            return (<div key={index} className="monthlySummary-divStyle monthly-Summary-SummaryStyle">
            <h4>{evidence.displayTitle}</h4>
            <p>{evidence.display1}</p>
            <p>{evidence.display2}</p>
            <p>{evidence.display3}</p>
            <p>{evidence.display4}</p>
            <div className="row">
                <div className="col-md-6 col-sm-8 col-xs-8">
                <p>{evidence.display5}</p>
                </div>
                <div className="col-md-6 col-sm-4 col-xs-2">
                    <AnchorFunctionality AnchorText="Details" redirectTo="WorkActivityDetails" dstClassName='' data={evdSubTypeAndEvidenceDesID}/>
                </div>
            </div>

        </div>)
        })
    }
    render(){
        let otherEvidence = this.props.otherEvidenceDisplay
        let unSubEvid=this.renUnSubEvidences()
        let submittedEvid = this.submittedEvidence(otherEvidence)
        return(
            <div>                
                {submittedEvid}
                {unSubEvid}
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
    evidences:store.evidences
    };
}
export default connect(mapStateToProps,{})(MonthlySummaryComponent);