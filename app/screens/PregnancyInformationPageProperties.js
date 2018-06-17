import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
    en:{
        // Screen labels
        formTitle:"Enter your pregnancy information",
        noOfUnborn:"How many children are you expecting?",
        dueDate:"If you are currently pregnant, please enter the due date.",
        pregnancyEndDate:"If your pregnancy ended in the last 6 months, please enter the pregnancy end date.",
        enrolledOnMedicaidDuringPregnancy:"Were you enrolled in Medicaid on the last day of your pregnancy?",
        save:"Save",
        cancel:"Cancel",

        // Message Validations
        PregDueOrEndDateAreMandatory:'The Pregnancy Due Date or Pregnancy End Date must be entered.',
        DueDateOutOfRange:'Pregnancy due date is out of 9 months in the future.',
        ChildExpected: ' How many children are you expecting ',
        IsMandatory:' must be entered.',
        ChildExpectedNumeric: 'The field "How many children are you expecting?" must be a whole number.',
        ChildisExpectedNumeric:'The field "How many children is fee expecting?" must be between "1" and "10".',
        PregDueDate: ' Pregnancy due date ',
        NotInPast:'cannot be in Past',
        PregnancyEndDate: ' Pregnancy end date ',
        InvalidDateProvided:" is not a valid date",
        PregDueOrEndDate: ' Pregnancy DueDate Or EndDate ',
        noOfUnbornchild: 'No Of Unborn should not be less than 1',
        LastSixMonth: 'should be in last six months',
        NotInFuture: 'should not be in future',
    },
    es:{
        // Screen labels
        formTitle:"Ingrese la información de su embarazo",
        noOfUnborn:"¿Cuantos bebes está esperando?",
        dueDate:"Si actualmente esta embarazada, por favor ingrese cuando finaliza su embarazo.",
        pregnancyEndDate:"Si su embarazo termino en los ultimos 6 meses, por favor ingrese la Fecha que termino.",
        enrolledOnMedicaidDuringPregnancy:"¿Usted fue inscrita en Medicaid en el último día de su embarazo?",
        save:"Guardar",
        cancel:"Cancelar",

        // Message Validations
        PregDueOrEndDateAreMandatory:'La fecha limite de embarazo o Fecha de termino de embarazo debe de ser ingresada.',
        DueDateOutOfRange:'La fecha limite de embarazo esta fuera de un rango de 9 meses en el futuro.',
        ChildExpected: ' Cuantos hijos esperas ',
        IsMandatory:'es obligatorio',
        ChildExpectedNumeric: 'Cuantos hijos esperas debe de ser un valor numerico',
        PregDueDate: ' Fecha de limite del embarazo ',
        NotInPast:'no puede estar en el pasado',
        PregnancyEndDate: ' Pregencia fecha de finalización ',
        InvalidDateProvided:" no es una fecha valida",
        PregDueOrEndDate: ' Fecha de limite del embarazo o fecha de finalización ',
        noOfUnbornchild: ' Numero de bebesno debe de ser menor a 1',
        LastSixMonth: 'debe estar en los últimos seis meses',
        NotInFuture: 'no debería estar en el futuro',
    }
});

var userLang = navigator.language || navigator.userLanguage;
strings.setLanguage(userLang)