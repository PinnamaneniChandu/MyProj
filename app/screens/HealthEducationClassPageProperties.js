import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
   en:{
      headerNote1: 'Participate in classes that help you understand your health, health care, money issues, and other subjects meant to increase your understanding of health related matters.',
      headerNote2: 'Enter information about the health education class you attend. You may count up to 20 hours each year from this activity.',
      formTitle: 'Enter information about Health Education Class.',
      className: 'Class Name ',
	  datesLabel: 'Enter class date(s)',
      attendance: 'Attendance Type ',
      hours: 'Class Hours ',
      contactName: 'Contact Name ',
      save: 'Save',
      cancel: 'Cancel',
      IsMandatory:' must be entered.',
      FromDate: 'Start Date ',
      ToDate: 'End Date ',
      ClassName: 'Class Name ',
      AttendanceType: 'Attendance Type',
      ContactName: 'Contact Name',
      AddressLine1: 'Address Line 1 ',
      City: 'City ',
      State: 'State ',
      ZipCode: 'Zip Code ',
      InValidZipCode: 'The Zip Code entered is not in a valid format.',
      FormatZipCode: ' It must either be in the following five digit format xxxxx or the following nine digit format xxxxx-xxxx.',
      Hours: 'Hour(s)',
      PhoneNumber: 'Phone Number',
      AreaCode: 'Area Code',
      InvalidPhoneNumber: 'The Phone Number entered is not in a valid format. It must be in the following ten digit format ',
      FormatPhoneNumber: '(Area code - Phone number) xxx-xxxxxxx.',
      DOBValidation:' cannot be before your Date of Birth',
      DifferentMonthValidation: ' and End Date must be in the same month',
      StartDateValidation: ' cannot be after End Date'
    },
  es: {
      headerNote1: 'Participa en clases que te ayudan a entender tu salud, cuidado de la salud, asuntos de dinero y otros temas que tienen como objetivo aumentar tu comprensión de asuntos relacionados con la salud.',
      headerNote2: 'Ingrese información sobre la clase de educación para la salud a la que asiste. Usted puede contar hasta 20 horas al año de esta actividad.',
      formTitle: 'Ingrese la informacion sobre Clase de Seguro de Salud.',
      className: 'Nombre de Clase *',
      attendance: 'Tipo de asistencia*',
      hours: 'Horas de clase en las que participo *',
      contactName: 'Nombre de contacto*',
      save: 'Guardar',
      cancel: 'Cancelar',
      IsMandatory:'es obligatorio',
      FromDate: 'Partir de la fecha ',
      ToDate: 'Hasta la fecha ',
      ClassName: 'Nombre de la clase ',
      AttendanceType: 'Tipo de asistencia',
      ContactName: 'Nombre de contacto',
      AddressLine1: 'Dirección Línea 1 ',
      City: 'Ciudad ',
      State: 'Estado ',
      ZipCode: 'Código postal ',
      InValidZipCode: 'El código postal ingresado no está en un formato válido.',
      FormatZipCode: ' Debe estar en el siguiente formato de cinco dígitos xxxxx o el siguiente formato de nueve dígitos xxxxx-xxxx.',
      Hours: 'Horas de trabajo ',
      PhoneNumber: 'El numero de telefono ',
      InValidPhoneNumber : 'El número de teléfono ingresado no está en un formato válido. Debe estar en el siguiente formato de diez dígitos ',
      FormatPhoneNumber: '(Código de área: número de teléfono) xxx-xxxxxxx.',
      DifferentMonthValidation: ' y la fecha de finalización debe estar en el mismo mes',        
      StartDateValidation: ' no puede ser después de la fecha de finalización'
    }
  });
  var userLang = navigator.language || navigator.userLanguage;
  strings.setLanguage(userLang)