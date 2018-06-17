import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
    en: {
        NewIncome: "Add New Income Source",
        IncomeReceived: "Enter the income you received",
        IncomeType: "Income Type",
        EmployerName: "What is the name of your Employer?",
        Amount: "Amount",
        FrequencyCode: "Frequency",
        StartDate: "Start Date",
        Save: "Save",
        Cancel: "Cancel",
        IncomeTypeWagesSalaries: "Wages and Salaries",
        IncomeTypeNetSelfEmployment: "Net Self Employment Income",
        IsManditory: " must be entered.",
        AmountNumber:"'Amount' must be a number.'",
        DOB:"cannot be before your Date Of Birth. ",
        FutureDate:"must be on or before the current date.",
        FrequencyMessage:"We will calculate a monthly income amount after you submit your new income source." ,
        AddIncomeNote:"After you submit this information, we will give you work activity hours for this income source for this month. If you are not exempt, you must continue to report your income on this website each month to get work activity hours."
     },
    es: {
        NewIncome: "Agregar nueva fuente de ingresos",
        IncomeReceived: "Ingrese los ingresos que recibió",
        IncomeType: "Tipo de ingreso",
        EmployerName: "Cual es el nombre de su empleador?",
        Amount: "Cantidad",
        FrequencyCode: "Frecuencia",
        StartDate: "Fecha de inicio",
        Save: "Salvar",
        Cancel: "Cancelar",
        IncomeTypeWagesSalaries: "Sueldos y salarios",        
        IncomeTypeNetSelfEmployment: "Ingreso neto de trabajo por cuenta propia",
        FrequencyMessage: "Calcularemos un monto de ingreso mensual después de enviar su nueva fuente de ingresos."
    }
});
var userLang = navigator.language || navigator.userLanguage;
strings.setLanguage(userLang)