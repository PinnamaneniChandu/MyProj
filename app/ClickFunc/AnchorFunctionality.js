import '../CSS/App.css';
import '../CSS/App-DesktopsScreen.css';
import '../CSS/App-extraSmallScreen.css';
import '../CSS/App-mediumScreen.css';
import '../CSS/App-smallScreen.css';
import PropTypes from 'prop-types';
import React from 'react'
import { withRouter } from 'react-router-dom'

const AnchorFunctionality = withRouter(({ history,AnchorText,redirectTo,dstClassName,data,disabled}) => (
        <a disabled={disabled}
            type='button' className={dstClassName}
            onClick={() => {
			if(redirectTo ==='RemoveMember'){
                    history.push({
                        pathname: '/RemoveMember', 
						state: {data}
                    })
            } 
			else if(redirectTo === "AddExemptionWorkActivity"){
                    history.push({
                        pathname: '/ExemptionsWorkAactivitiesPage'
                    })
            }
            else if(redirectTo === "HomeAddress"){
                history.push({
                    pathname: '/HomeAddress',
                    state: {data}
                })
            }
            else if(redirectTo === "UpdateContactHHAdressChangePage"){
                history.push({
                    pathname: '/UpdateContactInformationPage/UpdateContactHHAdressChangePage',
                    data: {data}
                })
            }
            else if(redirectTo === "HHAddressChange"){
                history.push({
                    pathname: '/HouseHoldAddressChange',
                    data: {data}
                })
            }
            else if(redirectTo === "InformationPage"){
                history.push({
                    pathname: '/',
                    data: {data}
                })
            }
            else if(redirectTo === "UpdateContactInformationPage"){
                history.push({
                    pathname: '/UpdateContactInformationPage',
                    data: {data}
                })
            }            
            else if(redirectTo === "EmailAddress"){
                history.push({
                    pathname: '/EmailAddress',
                    data: {data}
                })
            }
            else if(redirectTo === "UpdateContactInfoEmailAddress"){
                history.push({
                    pathname: '/UpdateContactInformationPage/UpdateContactInfoEmailAddress',
                    data: {data}
                })
            }
            else if(redirectTo === "UpdateContactInfoPhonenumber"){
                history.push({
                    pathname: '/UpdateContactInformationPage/UpdateContactInfoPhonenumber',
                    data: {data}
                })
            }	
            else if(redirectTo === "PhoneNumber"){
                history.push({
                    pathname: '/PhoneNumber',
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
            else if(redirectTo === "WorkActivityDetails"){
                history.push({
                    pathname: '/WorkActivityDetails',
                    data: {data}
                })
            }
            else if(redirectTo === "HHAddressRemove"){
                history.push({
                    pathname: '/HHAddressRemove',
                    data: {data}
                })
            }
            else if(redirectTo === "RemoveCIConfirmation"){
                history.push({
                    pathname: '/RemoveCIConfirmation',
                    data: {data}
                })
            }
            else if(redirectTo === "RemoveContactInfoErrorPage"){
                history.push({
                    pathname: '/RemoveContactInfoErrorPage',
                    data: {data}
                })
            }
            else if(redirectTo==="IVolunteer")
                {
                    history.push({
                            pathname: '/VolunteerPage',
                            data:{data}
                        })
                }
                else if(redirectTo==="Incapacitated")
                    {
                        history.push({
                                pathname: '/Incapacitated',
                                data:{data}
                            })
                        }			
                else if(redirectTo==="Alcohol")
                {
                    history.push({
                            pathname: '/AlcoholDrugTreatement',
                            data:{data}
                        })
                }
                else if(redirectTo==="HealthEducationClass")
                {
                    history.push({
                            pathname: '/HealthEducationClass',
                            data:{data}
                        })
                }
                else if(redirectTo==="PregnancyInformation")
                    {
                        history.push({
                                pathname: '/PregnancyInformation',
                                data:{data}
                            })	
                }
                else if(redirectTo==="StudentPage")
                    {
                        history.push({
                                pathname: '/StudentPage',
                                data:{data}
                            })
                    }
                else if(redirectTo==="JobSearchTrainingProgram")
                    {
                        history.push({
                                    pathname: '/JobSearchTrainingProgram',
                                    data:{data}
                            })
                    }else if(redirectTo==="InformationPage"){
                        history.push({
                                pathname: '/',
                            })
                    }else if(redirectTo==="Summary"){
                        history.push({
                                pathname: '/Summary',
                            })
                    }else if(redirectTo === "ProcessingContactInformation"){
                        history.push({
                            pathname: '/ProcessingContactInformation',
                            data: {data}
                        })
                    }	
                    else if(redirectTo==="SnapWorkPlan"){
                        history.push({
                                pathname: '/SnapWorkPlan',
                                data:{data}
                            })
                    }
                    else if(redirectTo==="JobSearch"){
                        history.push({
                                pathname: '/JobSearch',
                                data:{data}
                            })
                    }
                    else if(redirectTo==="SpecialHealthNeeds"){
                        history.push({
                                pathname: '/SpecialHealthNeeds',
                                data:{data}
                            })
                    }
                    else if(redirectTo==="RemoveExemption"){
                        history.push({
                                pathname: '/RemoveExemption',
                                data:{data}
                            })
                    }
                    else if(redirectTo==="NewIncomeSourcePage"){
                        history.push({
                                pathname: '/NewIncomeSourcePage',
                                data:{data}
                            })
                    }
                    else if(redirectTo==="UpdatePreferredContactInformationPage"){
                        history.push({
                                pathname: '/UpdateContactInformationPage/UpdatePreferredContactInformationPage',
                                data:{data}
                            })
                    }

                    else if(redirectTo==="preferedContactInformation"){
                        history.push({
                                pathname: '/UpdateContactInformationPage/preferedContactInformation',
                                data:{data}
                            })
                    }

                    else if(redirectTo === "UpdateContactHHAddressRemove"){
                        history.push({
                            pathname: '/UpdateContactInformationPage/UpdateHouseHoldAddressRemovePage',
                            data: {data}
                        })
                    }
                    else if(redirectTo === "UpdateRemoveContactInfoErrorPage"){
                        history.push({
                            pathname: '/UpdateContactInformationPage/UpdateRemoveContactInfoErrorPage',
                            data: {data}
                        })
                    }

                    else if(redirectTo === "UpdateRemoveCIConfirmation"){
                        history.push({
                            pathname: '/UpdateContactInformationPage/UpdateRemoveCIConfirmation',
                            data: {data}
                        })
                    }

                    else if(redirectTo === "UpdateProcessingContactInformation"){
                        history.push({
                            pathname: '/UpdateContactInformationPage/UpdateProcessingContactInformation',
                            data: {data}
                        })
                    }


                    


			
		}}
        >
            {AnchorText}
        </a>
))
AnchorFunctionality.propTypes = {
    history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(AnchorFunctionality);