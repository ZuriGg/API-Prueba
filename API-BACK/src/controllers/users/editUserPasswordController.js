import updateUserPasswordService from "../../services/users/updateUserPasswordService.js";

const editUserPasswordController = async (req,res,next) => {
    try {
        
        const {email, recoverPassCode, newPassword} = req.body;

        await updateUserPasswordService(email, recoverPassCode, newPassword);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada'
        });
        
    } catch (error) {
        next(error);
    }
}

export default editUserPasswordController;