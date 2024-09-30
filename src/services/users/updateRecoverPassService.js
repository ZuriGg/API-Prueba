import getPool from "../../database/getPool.js";
import sendMailBrevoUtils from "../../utils/sendMailBrevoUtils.js";


const updateRecoverPassService = async (email, recoverPassCode) => {
    const pool = await getPool();

    await pool.query(
        `
            UPDATE users
            SET recoverPassCode=?
            WHERE email=?
        `,
        [recoverPassCode, email]
    );

    const emailSubject= 'Recuperación de contraseña de Diario de Viajes';

    const emailBody = `
                <html>
                    <body>
                        <h2>Recuperación de contraseña para: ${email}</h2>
                        <p>
                            Se ha solicitado la recuperación de la contraseña de Diario de Viajes.
                            Utiliza el siquiente código de recuperación para creaer una nueva contrasaeña:
                            Codigo de recuperación: ${ recoverPassCode }
                        </p>
                        <p>
                            Si no ha sido usted, ignore este email
                        
                            Hecho con ❤ por el equipo de Diario de Viajes.
                        </p>
                    </body>
                </html>
        `;

        await sendMailBrevoUtils(email, emailSubject, emailBody);

}

export default updateRecoverPassService;