import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
   en:{
      AddIncomeHeader:'Add Income',
      AddIncomeIncomeType:'Type:',
      AddIncomeEmployerName:'Employer:',
      AddIncomeDetailsMessage:'Enter the income you received.',
      AddIncomeFieldAmount:'Amount',
      AmountSuffix:'.00',
      AddIncomeFieldDateReceived:'Date Received',
      ButtonSave:'Save',
      ButtonCancel:'Cancel',
      RequiredTag: '* Indicates a required field',
      DOBValidation: ' cannot be before your Date Of Birth',
      CURRENTDATE: " must be on or before the current date. ",
      IsManditory: "must be entered.",
      pendingApplication: "You have an application that has not been processed. Please contact 1-855-372-1084 or go to your DHS County Office if you need to report work requirement information that are disabled below."
    },
  es: {
    AddIncomeHeader:'Añadir ingresos',
    AddIncomeIncomeType:'Tipo:',
    AddIncomeEmployerName:'Empleador:',
    AddIncomeDetailsMessage:'Ingrese los ingresos que recibió.',
    AddIncomeFieldAmount:'Cantidad',
    AmountSuffix:'.00',
    AddIncomeFieldDateReceived:'Fecha de recepción',
    ButtonSave:'Salvar',
    ButtonCancel:'Cancelar',
    RequiredTag: '* Indica un campo obligatorio'
    }
  });
  var userLang = navigator.language || navigator.userLanguage;
  strings.setLanguage(userLang)