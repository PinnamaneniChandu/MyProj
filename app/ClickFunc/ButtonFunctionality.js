import '../CSS/App.css';
import '../CSS/App-DesktopsScreen.css';
import '../CSS/App-extraSmallScreen.css';
import '../CSS/App-mediumScreen.css';
import '../CSS/App-smallScreen.css';
import PropTypes from 'prop-types';
import React from 'react'
import { withRouter } from 'react-router-dom'

const ButtonFunctionality = withRouter(({ history,ButtonName,displayText,redirectTo,dstClassName,data,disabled, evidenceDate, yearAndMonthInfo, color}) => (

        <button disabled={disabled}
            type='button' className={dstClassName} style={{backgroundColor: color }}
            onClick={() => {
			if(redirectTo === "MonthlySummaryPage" ){
                    history.push({
                        pathname: '/MonthlySummaryPage',
                        state: {displayText},
                        data:{data},
                        evidenceDate: {evidenceDate},
                        yearAndMonthInfo: {yearAndMonthInfo}
                    })
            }  
			else if(redirectTo === "AddExemptionWorkActivity"){
                    history.push({
                        pathname: '/ExemptionsWorkAactivitiesPage'
                    })
            }
			else if(displayText==="MonthlyBack" || redirectTo==="ARWorksHomePage")
			{
				history.push({
                        pathname: '/Summary'
                    })
			}
			else if(displayText==="AddExemptionWorkActivity" || redirectTo==="AddExemptionWorkActivity"  )
			{
				history.push({
                        pathname: '/ExemptionsWorkAactivitiesPage'
                    })
			}
			else if(displayText==="IVolunteer")
			{
				history.push({
                        pathname: '/VolunteerPage'
                    })
			}
            else if(redirectTo==="Incapacitated")
                {
                    history.push({
                            pathname: '/Incapacitated'
                        })
                    }			
			else if(redirectTo==="Alcohol")
			{
				history.push({
                        pathname: '/AlcoholDrugTreatement'
                    })
            }
            else if(redirectTo==="HealthEducationClass")
            {
                history.push({
                        pathname: '/HealthEducationClass'
                    })
            }
            else if(redirectTo==="PregnancyInformation")
                {
                    history.push({
                            pathname: '/PregnancyInformation'
                        })	
            }
            else if(redirectTo==="StudentPage")
                {
                    history.push({
                            pathname: '/StudentPage'
                        })
                }
            else if(displayText==="JobSearchTrainingProgram")
                {
                        history.push({
                                pathname: '/JobSearchTrainingProgram'
                            })
                }
            else if(redirectTo==="HouseHoldInformation")
                    {
                        history.push({
                                pathname: '/HouseHoldInformation',
                                data: {data}
                            })
                    }
            else if(redirectTo==="InformationPage")
                    {
                        history.push({
                                pathname: '/',
                                data: {data}
                            })
                    } 
            else if(redirectTo==="UpdateContactInformationPage")
                    {
                        history.push({
                                    pathname: '/UpdateContactInformationPage',
                                    data: {data}
                             })
                    }
            else if(redirectTo==="HomeAddressValidation")
                    {                    
                        history.push({
                                pathname: '/HomeAddressValidation',
                                data: {data}
                            })
                    }

                    else if(redirectTo==="UpdateHomeAddressValidation")
                        {                    
                            history.push({
                                    pathname: '/UpdateContactInformationPage/UpdateHomeAddressValidation',
                                    data: {data}
                                })
                        }







            else if(redirectTo==="Acknowledgement")
                {
                    history.push({
                        pathname: '/Acknowledgement',
                        data: {data}
                    })
                }                 
            else if(redirectTo==="SubmissionPage"){                    
                    history.push({
                        pathname: '/SubmissionPage',
                        data: {data}
                    })
                }
            else if(redirectTo==="SubmissionStatus"){                    
                history.push({
                    pathname: '/SubmissionStatus'
                })
            }    
            else if(redirectTo==="JobSearch")
			{
				history.push({
                        pathname: '/JobSearch'
                    })
            }
            else if(redirectTo==="SpecialHealthNeeds")
			{
				history.push({
                        pathname: '/SpecialHealthNeeds',
                        data:{data}
                    })
            }		
            else if(redirectTo === "HomeAddress"){
                    history.push({
                        pathname: '/HomeAddress',
                        data: {data}
                    })
                }
            else if(redirectTo === "AddChild"){
                    history.push({
                        pathname: '/AddChild'
                    })
                }
            else if(redirectTo === "AddAnAdult"){
                    history.push({
                        pathname: '/AddAnAdult'
                    })
                }                
            else if(redirectTo === "MailingAddress"){
                history.push({
                    pathname: '/MailingAddress',
                    data: {data}
                })
            }
            else if(redirectTo === "UpdateContactInfoEmailAddress"){
                history.push({
                    pathname: '/UpdateContactInfoEmailAddress',
                    data: {data}
                })
            }
            else if(redirectTo === "MailingAddressValidation"){
                history.push({
                    pathname: '/MailingAddressValidation',
                    data: {data}
                })
            }             
            
            else if(redirectTo === "UpdateMailingAddressValidation"){
                history.push({
                    pathname: '/UpdateContactInformationPage/UpdateMailingAddressValidation',
                    data: {data}
                })
            }
            


            else if(redirectTo === "IncomeDetailsPage"){
                history.push({
                    pathname: '/IncomeDetailsPage',
                    data: {data}
                })
            }
            else if(displayText === "IncomeDetailsPage"){
                history.push({
                    pathname: '/IncomeDetailsPage',
                    })
            }
            else if(displayText === "SNAPWorkPlan"){
                history.push({
                    pathname: '/SnapWorkPlan',
                    })
            }       
            else if(redirectTo === "NewIncomeSourcePage"){
                history.push({
                    pathname: '/NewIncomeSourcePage',
                    data: {data}
                })
            }
            else if(redirectTo === "RemoveCIConfirmation"){
                history.push({
                    pathname: '/RemoveCIConfirmation',
                    data: {data}
                })
            }

            else if(redirectTo === "UpdateRemoveCIConfirmation"){
                history.push({
                    pathname: '/UpdateContactInformationPage/UpdateRemoveCIConfirmation',
                    data: {data}
                })
            }

            
            else if(redirectTo === "RemoveContactInfoErrorPage"){
                history.push({
                    pathname: '/RemoveContactInfoErrorPage',
                    data: {data}
                })
            }
                else if(redirectTo === "UpdateRemoveContactInfoErrorPage"){
                    history.push({
                        pathname: '/UpdateContactInformationPage/UpdateRemoveContactInfoErrorPage',
                        data: {data}
                    })

                
            }else if(redirectTo === "ProcessingPage"){
                history.push({
                    pathname: '/Processing',
                    data: {data}
                })
            }else if(redirectTo === "ProcessingContactInformation"){
                history.push({
                    pathname: '/ProcessingContactInformation',
                    data: {data}
                })
            }

            else if(redirectTo === "UpdateHomeAddress"){
                history.push({
                    pathname: '/UpdateContactInformationPage/UpdateHomeAddress',
                    data: {data}
                })
            }
            else if(redirectTo === "AddIncome"){
                history.push({
                    pathname: '/AddIncome',
                    data: {data}
                })
            }  
            else if(redirectTo === "EndIncome"){
                history.push({
                    pathname: '/EndIncome',
                    data: {data}
                })
            }

            else if(redirectTo === "UpdateMailingAddress"){
                history.push({
                    pathname: '/UpdateContactInformationPage/UpdateMailingAddress',
                    data: {data}
                })
            }

            else if(redirectTo === "UpdateProcessingContactInformation"){
                history.push({
                    pathname: '/UpdateContactInformationPage/UpdateProcessingContactInformation',
                    data: {data}
                })
            }

            
            else if(redirectTo === "UpdateProcessingPage"){
                history.push({
                    pathname: '/UpdateContactInformationPage/UpdateProcessingPage',
                    data: {data}
                })
            }
            else if(redirectTo === "ValidatingPersonDetails"){
                history.push({
                    pathname: '/ValidatingPersonDetails',
                    data: {data}
                })
            }

        }}	
        >
            {ButtonName}
        </button>
))
ButtonFunctionality.propTypes = {
history: PropTypes.shape({
    push: PropTypes.func.isRequired,
}).isRequired,
};

export default withRouter(ButtonFunctionality);