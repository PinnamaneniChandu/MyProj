import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
   en:{
      headingLabel:"Home Address",
      ButtonSave: "Save",
      ButtonCancel:'Cancel'
    },
  es: {
    headingLabel:"Direccion de casa",
    ButtonSave: "Salvar",
    ButtonCancel:'Cancelar'
    }
  });
  var userLang = navigator.language || navigator.userLanguage;
  strings.setLanguage(userLang)