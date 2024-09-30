import selectUserByIdService from "../../services/users/selectUserByIdService.js";

const getOwnUserController = async (req, res, next) => {
    try {
        
        const { id } = req.user; //es el id del USUARIO LOGEADO

        const user = await selectUserByIdService(id);

        res.send({
            status: 'ok',
            data:{
                user
            }
        });

    } catch (error) {
        next(error);
    }
}

export default getOwnUserController;