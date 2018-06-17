import React from 'react';
import '../../../CSS/App.css'
import '../../../CSS/App-DesktopsScreen.css'

export default class MonthlyIncomeDetailsComponent extends React.Component{
    render(){
        return(
            <div>                
				<div className="monthlySummary-divStyle monthly-Summary-SummaryStyle">
                    <h4>Independent Job Search</h4>
                    <p>Reported Hours: 25</p>
                    <p>Countable Hours: 25</p>
                    <div className="row">
                        <div className="col-md-6 col-sm-8 col-xs-8">
                            <p>Status: Submitted</p>
                        </div>
                        <div className="col-md-6 col-sm-4 col-xs-4">
                            <a> Details</a>
                        </div>
                    </div>
                </div>


                <div className="monthlySummary-divStyle monthly-Summary-SummaryStyle">
                    <h4>Wages & Salaries</h4>
                    <p>Reported Hours: 20</p>
                    <p>Countable Hours: 20</p>
                    <div className="row">
                        <div className="col-md-6 col-sm-8 col-xs-8">
                            <p>Status: Submitted</p>
                        </div>
                        <div className="col-md-6 col-sm-4 col-xs-4">
                            <a> Details</a>
                        </div>
                    </div>
                </div>

                <div className="monthlySummary-divStyle monthly-Summary-SummaryStyle">
                    <h4>Alcohol & Drug Treatment program</h4>
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <p>Status: Unsubmitted</p>
                        </div>
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <div className="col-md-6 col-sm-6 col-xs-6">
                                <a>Change</a>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-6">
                               <a>Remove</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}