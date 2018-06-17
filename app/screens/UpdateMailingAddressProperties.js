import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
   en:{
      headingLabel:"Mailing Address",
      sameAddressLabel:"Is the mailing address same as home address?",
      ButtonSave: "Save",
      ButtonCancel:'Cancel'
    },
  es: {
    headingLabel:"Dirección de envio",
    sameAddressLabel:"¿La dirección de correo es la misma que la dirección de casa?",
    ButtonSave: "Salvar",
    ButtonCancel:'Cancelar'
    }
  });
  var userLang = navigator.language || navigator.userLanguage;
  strings.setLanguage(userLang)