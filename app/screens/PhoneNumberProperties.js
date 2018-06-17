import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
  en:{
      headingLabel:'Phone Number',
      personalLabel: 'Personal Phone Number:',
      mobileLabel:'Mobile Phone Number:',
      phoneLable: 'Phone Number',
      ButtonSave: 'Save',
      ButtonCancel:'Cancel',
      AreaCode: 'Area Code',
      InValidPhoneNumber: 'The Personal Phone Number entered is not in a valid format. It must be in the following ten digit format ',
      FormatPhoneNumber: '(Area code - Phone number) xxx-xxxxxxx.',
      InValidMobileNumber: 'The Mobile Phone Number entered is not in a valid format. It must be in the following ten digit format ',
    },
  es: {
    headingLabel:'Número de teléfono',
    personalLabel: 'Número de teléfono personal',
    mobileLabel:'Número de teléfono móvil',
    phoneLable: 'Número de teléfono',
    ButtonSave: 'Salvar',
    ButtonCancel:'Cancelar',
    AreaCode: 'Codigo de AREA',
    InValidPhoneNumber: 'El número de teléfono personal ingresado no está en un formato válido. Debe estar en el siguiente formato de diez dígitos ',
    FormatPhoneNumber: '(Código de área: número de teléfono) xxx-xxxxxxx.',
    InValidMobileNumber: 'El número de teléfono móvil ingresado no está en un formato válido. Debe estar en el siguiente formato de diez dígitos ',
    }
  });
  var userLang = navigator.language || navigator.userLanguage;
  strings.setLanguage(userLang)