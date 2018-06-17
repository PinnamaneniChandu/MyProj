import LocalizedStrings from 'react-localization'

export let strings = new LocalizedStrings({
    en: {
        welcome: "Welcome",
        logout: "Logout",
        emergency:'For help call 1-855-372-1084',
        curCurrentInfo: "Current Contact Information",
        homeAddress: "Home Address",
        mailingAddress:"Mailing Address",
        homePhoneNumber:"Personal Phone Number",
        workPhoneNumber:"Work Phone Number",
        mobilePhoneNumber:"Mobile Phone Number",
        emailAddress:"Email Address",
        add:"Add",
        change:"Change",
        remove:"Remove",
        infoUpdated:"Your information has been updated",
        confirmContinue:"Confirm & Continue",
        emailMailingValidMsg: "Your Mailing Address and Email Address are mandatory to continue further",
        preferredcontactMailValidMsg: "Your Mailing address,Home address and Preferred contact method are mandatory to continue further",
        preferredcontactEmailValidMsg: "Your Email address is mandatory if preferred contact is mentioned as Paperless",
        infoAbtYou: 'Information About You',
        pendingApplication: "You have an application that has not been processed. Please contact 1-855-372-1084 or go to your DHS County Office if you need to report changes or work requirement information.",
        preferredcontact: "Preferred Contact Method",
        preferredcontacttext:"You can now view your healthcare coverage notices online. If you choose 'Paperless', you will only receive notiications via email."

    },
    es: {
        welcome: "Bienvenido",
        logout: "Cerrar sesión",
        curCurrentInfo: "Información de contacto actual",
        emergency:"Para obtener ayuda, llame al 1-855-372-1084",
        homeAddress: "Direccion de casa",
        mailingAddress:"Dirección de envio",
        homePhoneNumber:"Número de teléfono de casa",
        workPhoneNumber:"Número de teléfono del trabajo",
        mobilePhoneNumber:"Número de teléfono móvil",
        emailAddress:"Dirección de correo electrónico",
        add:"Añadir",
        change:"Cambio",
        remove:"retirar",
        infoUpdated:"Su información ha sido actualizada",
        confirmContinue:"Confirmar y continuar",
        pendingApplication: "You have an application that has not been processed. Please contact 1-855-372-1084 or go to your DHS County Office if you need to report changes or work requirement information.",
        preferredcontact: "Método de Contacto Preferido",
        preferredcontacttext: "Ahora puede ver sus avisos de cobertura de atención médica en línea. Si elige 'Sin papel', solo recibirá notificaciones por correo electrónico."
    }
});
var userLang = navigator.language || navigator.userLanguage;
strings.setLanguage(userLang)