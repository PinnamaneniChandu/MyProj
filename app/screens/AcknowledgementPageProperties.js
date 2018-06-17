import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
   en:{
      ReportingInfomrationHeader:'You are reporting the following information for ',
      ConfirmationMessage:'Are you sure you want to submit this information? Once submitted this information cannot be changed.',
      ConfirmationMessage1:'By submitting this information, I am certifying that I have provided true answers to all the questions to the best of my knowledge. I understand that I may be subject to penalties under Arkansas or Federal law for providing false or untrue information.',
      PenaltyPerjuryMessage:' I declare under penalty of perjury that the foregoing is true and correct.',
      ButtonSave:'Submit',
      ButtonCancel:'Cancel',
      EEF_ARWORKS_ADDED_ALCOHOL_DRUG_TRETEMENT_PROGRAM:'%1s is in an alcohol or drug treatment program.',
      
      EEF_ARWORKS_ADDED_ATTENDING_HEALTH_EDUCATION_CLASS:' %1s took health education class: %2s',
      
      EEF_ARWORKS_ADDED_BLIND_INFORMATION:'%1s is blind.',
      
      EEF_ARWORKS_ADDED_CARING_SOMEONE_CANNOT_CARE_HIM_HER_SELF:'%1s is caring for %2s',
      
      EEF_ARWORKS_ADDED_CHILD:'Added a child - %1s,%2d.',
      
      EEF_ARWORKS_ADDED_COMPLIANCE_DWS_PLAN:'%1s is compliant with DWS work plan.',
      
      EEF_ARWORKS_ADDED_COMPLIANCE_SNAP_PLAN:'%1s is compliant with SNAP work plan.',
      
      EEF_ARWORKS_ADDED_DISABLED_INFORMATION:'%1s has a disability.',
      
      EEF_ARWORKS_ADDED_JOB_SEARCH:'%1s participated in job search activities.',
      
      EEF_ARWORKS_ADDED_JOB_SEARCH_TRAINING:'%1s participated in job search training at %2s.',
      
      EEF_ARWORKS_ADDED_NEED_HELP_DAILY_ACTIVITIES:'1%s needs help with daily activities.',
      
      EEF_ARWORKS_ADDED_NEW_INCOME:'Added New Income Received - %1s, Conditional only if Wages and Salaries %2s,%3s.',
      
      EEF_ARWORKS_ADDED_NEW_INCOME_SOURCE:'Added New Income Source - %1s Conditional only if Wages and Salaries %2s',
      
      EEF_ARWORKS_ADDED_PREGNANCY:' %1s is pregnant with due date of %2d.',
      
      EEF_ARWORKS_ADDED_SCHOOL_VOCATIONAL_TRAINING_JOB_TRAINING:' %1s is going to school, vocational or job training at %2d.',
      
      EEF_ARWORKS_ADDED_SHORT_TERM_DISABILITY:'%1s has a short-term disability.',
      
      EEF_ARWORKS_ADDED_UNEMPLOYMENT_BENEFITS:'%1s is getting unemployment benefits.',
      
      EEF_ARWORKS_ADDED_VOLUNTEER:'%1s volunteered at %2s.',
      
      EEF_ARWORKS_REMOVED_MEMBER:'Removed member -%1s,%2d.',

    },
  es: {
    ReportingInfomrationHeader:'Spanish Version You are reporting the following information for March 2018:',
    ConfirmationMessage:'Spanish Version Are you sure you want to submit this information? Once submitted this information cannot be changed.',
    ConfirmationMessage1:'Spanish Version By submitting this information, i am certifying that i have provided true answers to all the questions to the bes of my knowledge. I understand that i may be subject to penalties under Arkansas or Federal law for providing false or untrue information',
    PenaltyPerjuryMessage:'* Spanish Version I declare under penalty of perjury that the foregoing is true and correct',
    ButtonSave:'Salvar',
    ButtonCancel:'Cancelar',

    EEF_ARWORKS_ADDED_ALCOHOL_DRUG_TRETEMENT_PROGRAM:'%1s is in an alcohol or drug treatment program.',
    
    EEF_ARWORKS_ADDED_ATTENDING_HEALTH_EDUCATION_CLASS:' %1s took health education class: %2s',
    
    EEF_ARWORKS_ADDED_BLIND_INFORMATION:'%1s is blind.',
    
    EEF_ARWORKS_ADDED_CARING_SOMEONE_CANNOT_CARE_HIM_HER_SELF:'%1s is caring for %2s',
    
    EEF_ARWORKS_ADDED_CHILD:'Added a child - %1s,%2d.',
    
    EEF_ARWORKS_ADDED_COMPLIANCE_DWS_PLAN:'%1s is compliant with DWS work plan.',
    
    EEF_ARWORKS_ADDED_COMPLIANCE_SNAP_PLAN:'%1s is compliant with SNAP work plan.',
    
    EEF_ARWORKS_ADDED_DISABLED_INFORMATION:'%1s has a disability.',
    
    EEF_ARWORKS_ADDED_JOB_SEARCH:'%1s participated in job search activities.',
    
    EEF_ARWORKS_ADDED_JOB_SEARCH_TRAINING:'%1s participated in job search training at %2s.',
    
    EEF_ARWORKS_ADDED_NEED_HELP_DAILY_ACTIVITIES:'1%s needs help with daily activities.',
    
    EEF_ARWORKS_ADDED_NEW_INCOME:'Added New Income Received - %1s, Conditional only if Wages and Salaries %2s,%3s.',
    
    EEF_ARWORKS_ADDED_NEW_INCOME_SOURCE:'Added New Income Source - %1s Conditional only if Wages and Salaries %2s',
    
    EEF_ARWORKS_ADDED_PREGNANCY:' %1s is pregnant with due date of %2d.',
    
    EEF_ARWORKS_ADDED_SCHOOL_VOCATIONAL_TRAINING_JOB_TRAINING:' %1s is going to school, vocational or job training at %2d.',
    
    EEF_ARWORKS_ADDED_SHORT_TERM_DISABILITY:'%1s has a short-term disability.',
    
    EEF_ARWORKS_ADDED_UNEMPLOYMENT_BENEFITS:'%1s is getting unemployment benefits.',
    
    EEF_ARWORKS_ADDED_VOLUNTEER:'%1s volunteered at %2s.',
    
    EEF_ARWORKS_REMOVED_MEMBER:'Removed member -%1s,%2d.',
    }
  });
  var userLang = navigator.language || navigator.userLanguage;
  strings.setLanguage(userLang)