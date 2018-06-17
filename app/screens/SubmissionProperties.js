import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
    en: {
        Title: "Submission Acknowledgment",
        receivedInformation: "We have received your information",
        notRequiredToWork: "You are not required to work at this time.",
        reason: "Reason:",
        exemptionReason: 'Exemption Reason : ',
        exemptionPeriod: 'Exemption Period : ',
        participating: "Participating in an alcohol or drug treatment program",
        noFurtherAction: "No further action is needed. You will receive a notice with more information about your exemption.",
        home: "Home",
        status : 'Status : ',
        totalHours: 'Total Hours : ',
        totalRemainingHours: 'Total Remaining Hours : ',
        notSubjectToWorkRequirement: 'You are not subject to the work requirement. You are not required to report work activities. No further action is needed.',
        interimImplementationPeriod: 'You are in an Interim Period. You are not required to report work activities. No further action is needed.',
        interimApplicationPeriod: 'You are in an Interim Period. You are not required to report work activities. No further action is needed.',
        interimRenewPeriod: 'You are in an Interim Period. You are not required to report work activities. No further action is needed.',
        interimAdversePeriod: 'You are in an Interim Period. You are not required to report work activities. No further action is needed.',
        exempt: 'No further action is needed. You will receive a notice with more information about your exemption.',
        requiredToReportWorkActivities:'You are required to report work activities.',
        compliant: 'You have completed 80 hours of work activities to comply with work requirement for ',
        compliant1: '. Remember to report your ' ,
        compliant2: ' work activities by 5th of following month',
        nonARWorksAddChild: 'You will receive a notice for additional infromation from DHS.',
        EXMT : 'Exempt',
        NSW : "Not Subject to Work Requirement",
        IIP :'Interim Period',
        IAP : 'Interim Period',
        IRP : 'Interim Period',
        IAAP : 'Interim Period',
        RTW : 'Required to Report Work Activities',
        COMP : 'Compliant',
        NCM : 'Non-Compliant',
        NCM1 : 'Non-Compliant',
        NCM2 : 'Non-Compliant',
        NCM3 : 'Non-Compliant',
        EXAIAN : 'Alaskan Native/American Indian',
        TEACASHEX : 'Receiving TEA Cash Assistance',
        EXEC : 'Exempt for Extenuating Circumstances', 
        EXSNAP : 'SNAP Exemption',
        EXFS: 'Full Time Student Exemption',
        EXMF: 'Medically Frail Exemption',
        EXDM : 'Dependent Minor Exemption',
        EXEH : 'Employed Eighty Hours Exemption',
        EXPR : 'Pregnant Exemption',
        EXUN : 'Unemployed Exemption',
        EXED : 'Education Job Training Exemption',
        EXIC : 'Incapacitated Care Exemption',
        EXIS : 'Incapacitated Self Exemption',
        EXAL : 'Participation Alcohol or Drug Exemption',
    },
    es: {
        receivedInformation: "Hemos recibido su información.",
        notRequiredToWork: "No está obligado a trabajar en este momento.",
        reason: "Razón:",
        participating: "Participar en un programa de tratamiento de alcohol o drogas",
        noFurtherAction: "No se necesita ninguna otra acción. Recibirá un aviso con más información sobre su exención.",
        home: "Casa"
    }
});
var userLang = navigator.language || navigator.userLanguage;
strings.setLanguage(userLang)