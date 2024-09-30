import nodemailer from 'nodemailer';
import dotenv from 'dotenv/config';
import generateErrorsUtils from './generateErrorsUtils.js';



const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

//configuro a nodemailer para que se conecte con Brevo
const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth:{
        user: SMTP_USER,
        pass: SMTP_PASS
    }
});

const sendMailUtils = async (email, subject, body) => {
    try {
        
        const mailOptions = {
            from: SMTP_USER,
            to: email,
            subject,
            text: body
        };

        await transport.sendMail(mailOptions);

    } catch (error) {
        console.log(error);
        generateErrorsUtils('Error al enviar email', 500);
    }
}

export default sendMailUtils;