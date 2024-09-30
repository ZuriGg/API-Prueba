import bcrypt from 'bcrypt';
import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import sendMailUtils from '../../utils/sendMailUtils.js';
import sendMailBrevoUtils from '../../utils/sendMailBrevoUtils.js';

const insertUserServices = async (email, password, registrationCode) => {
    
        const pool = await getPool();

        const [user] = await pool.query(
            `
                SELECT id FROM users WHERE email=?
            `,
            [email]
        );

        if(user.length) throw generateErrorsUtils('El email ya se encuentra registrado',409);

        /**
         * Metodo para envío del email para confirmar el registro
         * borra el codigo de registro y el active lo pone en 1
         */
        
        const emailSubject= 'Activa tu cuenta de Diario de Viajes';

        const emailBody = `
                <html>
                    <body>
                        <h2>!!Bienvenid@ ${email}</h2>
                        <p>
                            Gracias por registrarte en Diario de Viajes. Para activiar tu cuenta
                            debes hacer click en el siguiente enlace:
                        </p>
                        <p>
                            <a href="http://localhost:3001/users/validate/${registrationCode}">Activar Cuenta</a>
                        
                            Hecho con ❤ por el equipo de Diario de Viajes.
                        </p>
                    </body>
                </html>
        `;

        //await sendMailUtils(email, emailSubject, emailBody);
        await sendMailBrevoUtils(email, emailSubject, emailBody);

        const passwordHashed = await bcrypt.hash(password,10);

        await pool.query(
            `
                INSERT INTO users (email, password, registrationCode)
                VALUES (?,?,?)
            `,
            [email,passwordHashed,registrationCode]
        );
}

export default insertUserServices;