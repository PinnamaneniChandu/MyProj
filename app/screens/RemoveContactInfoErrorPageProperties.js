import LocalizedStrings from 'react-localization'
export let strings = new LocalizedStrings({
   en:{    
      ButtonNext: "Continue",
      ButtonCancel:'Cancel',
      Heading:'Required Information',
      Confirmation:'If you do not have an email address you can go to the home page of one of the popular free email providers* such as Gmail (@gmail.com) or Yahoo Mail (@yahoo.com). From there, click sign up or create an account.',
      Note : '*Please note that DHS does not endorse any third-party email provider.'
      
    },
  es: {
    headingLabel:"Direccion de casa",
    ButtonSave: "Salvar",
    ButtonCancel:'Cancelar'
    }
  });
  var userLang = navigator.language || navigator.userLanguage;
  strings.setLanguage(userLang)