import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
    en: {
        EndIncome:'End Income',
        Type:'Type:',
        Employer: 'Employer:',
        Message: 'Enter the date you stopped receiving this income',
        Date: 'Date',
        Save: 'Save',
        Cancel: 'Cancel'
        },
    es: {
        EndIncome: 'Ingreso final',
        Type: 'Tipo:',
        Employer: 'Empleador:',
        Message: 'Ingrese la fecha en que dejó de recibir este ingreso',
        Date: '*Fecha',
        Save: 'Salvar',
        Cancel: 'Cancelar'
        }
    });
  var userLang = navigator.language || navigator.userLanguage;
  strings.setLanguage(userLang)