import brevo from '@getbrevo/brevo';
import 'dotenv/config';
import generateErrorsUtils from './generateErrorsUtils.js';

const { SMTP_API_KEY } = process.env;

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    SMTP_API_KEY
);

const sendMailBrevoUtils = async (email, subject, body) => {
    try {

        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = subject;

        sendSmtpEmail.to = [
            { email: email}
        ];

        sendSmtpEmail.htmlContent = body;

        sendSmtpEmail.sender = {
            name: "Equipo de Diario de Viajes",
            email: "nalbera@gmail.com"
        };

        await apiInstance.sendTransacEmail(sendSmtpEmail);

    } catch (error) {
        console.log(error);
        throw generateErrorsUtils('Error al enviar email', 500);
    }
}

export default sendMailBrevoUtils;