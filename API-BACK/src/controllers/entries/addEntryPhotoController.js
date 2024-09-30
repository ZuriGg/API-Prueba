import insertPhotoEntrieService from "../../services/entries/insertPhotoEntrieService.js";
import selectEntryByIdService from "../../services/entries/selectEntryByIdService.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import { savePhotoUtils } from "../../utils/photoUtils.js";


const addEntryPhotoController = async (req, res, next) => {
    try {
        
        const { entryId } = req.params;

        const entry = await selectEntryByIdService(entryId);

        if(entry.photos.length > 2){
            throw generateErrorsUtils('Se alcanzó el límite de imágenes para la entrada', 409);
        }

        const photoName = await savePhotoUtils(req.files.photo,500);

        const photoId = await insertPhotoEntrieService(photoName, entryId);

        res.send({
            status: 'ok',
            data:{
                id: photoId,
                name: photoName
            }
        });

    } catch (error) {
        next(error);
    }
}

export default addEntryPhotoController;