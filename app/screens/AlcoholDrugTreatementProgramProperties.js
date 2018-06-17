import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
   en:{
      programFacilityName:"Program/Facility Name",
      contactName:"Contact Name",
      info: "Enter information about the alcohol or drug treatment program you participate in.",
      title: "Alcohol or Drug Treatment Program",
      save: "Save",
      Cancel: "Cancel",
      IsMandatory:' must be entered.',
      FromDate: 'From Date ',
      ToDate: 'To Date ',
      ProgramName: 'Program/Facility Name ',
      ContactName: 'Contact Name ',
      AddressLine1: 'Address Line 1 ',
      City: 'City ',
      State: 'State ',
      ZipCode: 'Zip Code ',
      IsInvalid:'is invalid',
      InValidZipCode: 'The Zip Code entered is not in a valid format.',
      FormatZipCode: ' It must either be in the following five digit format xxxxx or the following nine digit format xxxxx-xxxx.',
      PhoneNumber: 'Phone Number',
      AreaCode: 'Area Code',
      InvalidPhoneNumber: 'The Phone Number entered is not in a valid format. It must be in the following ten digit format ',
      FormatPhoneNumber: '(Area code - Phone number) xxx-xxxxxxx.' 

	  },
  es: {
      programFacilityName:"*Nombre del programa / instalación",
      contactName:"*contacto nombre",
      info: "Ingrese la información sobre el programa / instalación donde está participando.",
      title:"Programa de Tratamiento de Alcohol o Drogas",
      save: "Salvar",
      Cancel:"Cancelar",
      IsMandatory:'es obligatorio',
      FromDate: 'Partir de la fecha ',
      ToDate: 'Hasta la fecha ',
      ProgramName: 'Nombre del programa / instalación ',
      ContactName: 'Nombre de contacto ',
      AddressLine1: 'Dirección Línea 1 ',
      City: 'Ciudad ',
      State: 'Estado ',
      ZipCode: 'Código postal ',
      IsInvalid:'es inválido',
      InValidZipCode: 'El código postal ingresado no está en un formato válido.',
      FormatZipCode: ' Debe estar en el siguiente formato de cinco dígitos xxxxx o el siguiente formato de nueve dígitos xxxxx-xxxx.',
      InValidPhoneNumber : 'El número de teléfono ingresado no está en un formato válido. Debe estar en el siguiente formato de diez dígitos ',
      FormatPhoneNumber: '(Código de área: número de teléfono) xxx-xxxxxxx.',
      PhoneNumber: 'Número de teléfono '
    }
  });
  var userLang = navigator.language || navigator.userLanguage;
  strings.setLanguage(userLang)