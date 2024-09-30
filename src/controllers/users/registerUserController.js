import generateErrorsUtils from '../../utils/generateErrorsUtils.js'
import insertUserServices from '../../services/users/inserUserServices.js';
import randomString from 'randomstring';

//todo lo que viene desde el front viene por la request (req)
//body: viene desde un forulario
//params: cuando viene por la query string /user/1
//query: cuando vienen parametros (mas de uno) ejemplo: nombre, edad
//      /users?nombre=juan&&apellido=fernendez


const registerUserController = async (req, res, next) => {
    try {
        
        const {email, password} = req.body;

        if(!email || !password) throw generateErrorsUtils('Se esperaba email o contraseña', 400);

        const registrationCode = randomString.generate(15);
        
        await insertUserServices(email, password, registrationCode);

        res.send({
            status: 'ok',
            message: 'Usuario registrado. Verifique su cuenta mediante el email recibido'
        });
        

    } catch (error) {
        next(error);
    }
}

export default registerUserController;