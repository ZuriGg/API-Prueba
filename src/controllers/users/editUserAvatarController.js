import selectUserByIdService from "../../services/users/selectUserByIdService.js";
import { deletePhotoUtils, savePhotoUtils } from "../../utils/photoUtils.js";
import updateUserAvatarService from "../../services/users/updateUserAvatarService.js";

const editUserAvatarController = async (req, res, next) => {
    try {
        
        //recuperar el archivo que se envía por request
        //console.log(req.files.avatar);
        //res.send('Lo hice');
        const { avatar } = req.files;
        
        const user = await selectUserByIdService(req.user.id);

        if(user.avatar) await deletePhotoUtils(user.avatar);

        const avatarName = await savePhotoUtils(avatar, 100);

        await updateUserAvatarService(avatarName, req.user.id);

        res.send({
            status: 'ok',
            message: 'Avatar actualizado'
        });

    } catch (error) {
        next(error);
    }
}

export default editUserAvatarController;