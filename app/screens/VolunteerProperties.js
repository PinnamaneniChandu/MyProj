import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
    en: {
        volunteer: 'Volunteer Activity',
        fromDate: 'From Date*',
        toDate: 'To Date*',
		datesLabel: 'Enter volunteer date(s) ',
        organizationName: 'Organization Name',
        hours: 'Hours',
        contactPerson: 'Contact Name',
        headerNote: 'You may volunteer at any non-profit organization, including churches and local government agencies. The volunteer site must be willing to verify your participation and supervision, if requested. You can find volunteer opportunities at ',
        heading: 'Enter information about volunteer activities that you participate in.',
        footerNote: 'Note: You may not volunteer if the work you perform would otherwise be a paid job for a person who is not in Arkansas Works. Vacant jobs caused by layoffs, firings or hirings freezes cannot be filled by an Arkansas Works volunteer. You may volunteer for an elected official, but your volunteer activities cannot be political. Volunteering for a campaign is political and not allowed.',
        save: 'Save',
        cancel: 'Cancel',
        IsMandatory:' must be entered.',
        FromDate: 'Start Date ',
        ToDate: 'End Date ',
        OrganizationName: 'Organization Name ',
        Hours: 'Hour(s) ',
        ContactName: 'Contact Name ',
        ContactPersonName: 'contact Person Name ',
        IsInvalid: 'is invalid ',
        AddressLine1: 'Address Line 1',
        City: 'City',
        State: 'State',
        ZipCode: 'Zip Code ',
        InvalidZipCode: 'The Zip Code entered is not in a valid format.',
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
        volunteer: 'Actividad de Voluntariado',
        fromDate: 'Partir de la fecha*',
        toDate: 'Hasta la fecha*',
        organizationName: 'Nombre de la Organización*',
        hours: 'Horas de trabajo*',
        contactPerson: 'Nombre de contacto',
        headerNote: 'Usted puede ser voluntario en cualquier organización sin fines de lucro, incluyendo iglesias y agencias gubernamentales locales. El sitio del voluntario debe estar dispuesto a verificar su participación y supervisión, si así lo solicita. Puede encontrar oportunidades de voluntariado en ',
        heading: 'Incorpore la información sobre las actividades voluntarias que usted participa adentro.',
        footerNote: 'Nota: Usted no puede ser voluntario si el trabajo que usted realiza sería de otra manera un trabajo pagado para una persona que no está en Arkansas Works. Los trabajos vacantes causados ​​por despidos, despidos o congelamiento de contrataciones no pueden ser cubiertos por un voluntario de Arkansas Works. Puede ser voluntario para un funcionario electo, pero sus actividades de voluntariado no pueden ser políticas. Voluntariado para un campagin es político y no permitido.',
        save: 'Salvar',
        cancel: 'Cancelar',
        IsMandatory:'es obligatorio',
        FromDate: 'Partir de la fecha ',
        ToDate: 'Hasta la fecha ',
        OrganizationName: 'Nombre de la Organización ',
        Hours: 'horas ',
        ContactName: 'Nombre de contacto ',
        ContactPersonName: 'Nombre del Contacto ',
        IsInvalid: 'es inválido ',
        AddressLine1: 'Dirección Línea 1',
        City: 'Ciudad',
        State: 'Estado',
        ZipCode: 'Código postal ',
        InvalidZipCode: 'El código postal ingresado no está en un formato válido.',
        FormatZipCode: ' Debe estar en el siguiente formato de cinco dígitos xxxxx o el siguiente formato de nueve dígitos xxxxx-xxxx.',
        PhoneNumber: 'El numero de telefono',
        InvalidPhoneNumber: 'El número de teléfono ingresado no está en un formato válido. Debe estar en el siguiente formato de diez dígitos ',
        FormatPhoneNumber: '(Código de área: número de teléfono) xxx-xxxxxxx.',
        DifferentMonthValidation: ' y la fecha de finalización debe estar en el mismo mes',        
        StartDateValidation: ' no puede ser después de la fecha de finalización'
    }
})
var userLang = navigator.language || navigator.userLanguage
strings.setLanguage(userLang)
