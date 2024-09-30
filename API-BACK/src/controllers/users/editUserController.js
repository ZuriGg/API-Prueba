import updateUserService from "../../services/users/updateUserService.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const editUserController = async (req, res, next) => {
    try {
        
        const { userId } = req.params;

        const {firstName, lastName} = req.body;

        //verifico que el usuario que voy a modificar sea el usuario logueado (propietario)
        if(userId != req.user.id) throw generateErrorsUtils('Usuario no autorizado para esta operación', 409);

        await updateUserService(firstName, lastName, userId);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado correctamente'
        });

    } catch (error) {
        next(error);
    }
}

export default editUserController;