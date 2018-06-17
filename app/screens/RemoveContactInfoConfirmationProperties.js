import LocalizedStrings from 'react-localization'
export let strings = new LocalizedStrings({
   en:{    
      ButtonNext: "Continue",
      ButtonCancel:'Cancel',
      Heading:'Remove Home Address',
      Confirmation:'You are removing your home address. Are you sure?'
      
    },
  es: {
    headingLabel:"Direccion de casa",
    ButtonSave: "Salvar",
    ButtonCancel:'Cancelar'
    }
  });
  var userLang = navigator.language || navigator.userLanguage;
  strings.setLanguage(userLang)