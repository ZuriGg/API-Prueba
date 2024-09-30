import randomstring from 'randomstring';
import selectUserByEmailService from "../../services/users/selectUserByEmailService.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import updateRecoverPassService from '../../services/users/updateRecoverPassService.js';

const sendRecoverPassController = async (req, res, next) => {
    try {
        
        const {email} = req.body;

        const user = await selectUserByEmailService(email);

        if(!user) throw generateErrorsUtils('Usuario no encontrado', 404);

        const recoverPassCode = randomstring.generate(10);

        await updateRecoverPassService(email, recoverPassCode);

        res.send({
            status: 'ok',
            message: 'Correo de recuperación enviado'
        });

    } catch (error) {
        next(error);
    }
}

export default sendRecoverPassController;