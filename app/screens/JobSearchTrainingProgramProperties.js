import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
    en: {
        heading:"Job Search Training",
        headerNote:"Enter information about Job Search Training activities. You may count up to 39 total hours from Job Search and Job Search Training each month.",
        datesLabel:"Enter training date(s)", 
        fromDate: "From Date",
        toDate:"To Date",
        hours:"Hour(s)",
        programName:"Program Name",
        contactName:"Contact Name",
        save: "Save",
        cancel: "Cancel",
        FromDate: 'Start Date',
        ToDate: 'End Date',
        datesInSameMonth: "The Start Date and End Date must be in the same month.",
        IsMandatory:' must be entered.',
        IsInvalid:'is invalid',
        AddressLine1: 'Address Line 1 ',
        City: 'City ',
        State: 'State ',
        ZipCode: 'Zip Code ',
        InValidZipCode: 'The Zip Code entered is not in a valid format.',
        FormatZipCode: ' It must either be in the following five digit format xxxxx or the following nine digit format xxxxx-xxxx.',
        PhoneNumber: 'Phone Number',
        AreaCode: 'Area Code',
        InvalidPhoneNumber: 'The Phone Number entered is not in a valid format. It must be in the following ten digit format ',
        FormatPhoneNumber: '(Area code - Phone number) xxx-xxxxxxx.',
        DOBValidation: ' cannot be before your Date Of Birth',
        DifferentMonthValidation: ' and End Date must be in the same month',
        StartDateValidation: ' cannot be after End Date'

    },
    es: {
        heading:"Entrenamiento de búsqueda de empleo",
        headerNote:"Ingrese información sobre las actividades de capacitación de búsqueda de empleo. Usted puede contar hasta 39 horas totales de búsqueda de empleo y entrenamiento de búsqueda de empleo cada mes.",
        datesLabel:"Ingrese las fechas de entrenamiento", 
        fromDate: "Partir de la fecha",
        toDate:"Hasta la fecha",
        hours:"Horas",
        programName:"Nombre del programa",
        contactName:"Nombre de contacto",
        save: "Salvar",
        cancel: "Cancelar",
        FromDate: 'Partir de la fecha',
        ToDate: 'Hasta la fecha',
        datesInSameMonth: 'La fecha de inicio y la fecha de finalización deben estar en el mismo mes',
        IsMandatory:'es obligatorio',
        IsInvalid:'es inválido',
        AddressLine1: 'Dirección Línea 1',
        City: 'Ciudad',
        State: 'Estado',
        ZipCode: 'Código postal',
        InValidZipCode: 'El código postal ingresado no está en un formato válido.',
        FormatZipCode: ' Debe estar en el siguiente formato de cinco dígitos xxxxx o el siguiente formato de nueve dígitos xxxxx-xxxx.',
        InValidPhoneNumber : 'El número de teléfono ingresado no está en un formato válido. Debe estar en el siguiente formato de diez dígitos ',
        FormatPhoneNumber: '(Código de área: número de teléfono) xxx-xxxxxxx.',
        PhoneNumber: 'Número de teléfono ',
        DifferentMonthValidation: ' y la fecha de finalización debe estar en el mismo mes',        
        StartDateValidation: ' no puede ser después de la fecha de finalización'
        
    }
});
var userLang = navigator.language || navigator.userLanguage;
strings.setLanguage(userLang)