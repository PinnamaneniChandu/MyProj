import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
   en:{
      headingLabel:"Email Address",
      newEmailLabel: "New Email",
      reEnterEmailLabel:"Re-enter Email",
      ButtonSave: "Save",
      ButtonCancel:'Cancel',
      CurrentEmail: 'Current Email:',
      InValidEmailLength: 'Please enter a valid email address, e.g., sample@email.com. The email address must be between \'5\' and \'63\' characters.',
      InValidEmailAddress: 'Please enter a valid email address, e.g., sample@email.com.',
      MatchEmailAddress: 'Email addresses you entered do not match.'
    },
  es: {
    headingLabel:"Dirección de correo electrónico",
    newEmailLabel: "Nuevo Email",
    reEnterEmailLabel:"Vuelva a introducir el correo electrónico *",
    ButtonSave: "Salvar",
    ButtonCancel:'Cancelar',
    CurrentEmail: 'Email actual:',
    InValidEmailLength: 'Ingrese una dirección de correo electrónico válida, por ejemplo, sample@email.com. La dirección de correo electrónico debe estar entre \'5 \' y \'63 \'caracteres.',
    InValidEmailAddress: 'Ingrese una dirección de correo electrónico válida, por ejemplo, sample@email.com.',
    MatchEmailAddress: 'Las direcciones de correo electrónico que ingresó no coinciden.'
    }
  });
  var userLang = navigator.language || navigator.userLanguage;
  strings.setLanguage(userLang)