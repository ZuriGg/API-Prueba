import insertEntryService from "../../services/entries/insertEntryService.js";
import insertPhotoEntrieService from "../../services/entries/insertPhotoEntrieService.js";
import { savePhotoUtils } from '../../utils/photoUtils.js'

const newEntryController = async (req, res, next) => {
    try {
        
        const { title, place, description } = req.body;
        //const { id } = req.user;
        const userId = req.user.id;

        const entryId = await insertEntryService(title, place, description, userId);

        /**
         * completar con lógica para insertar imagenes y asociarlas a la entrada
         * mediante el entryId
         */
        let photos = [];

        if(req.files){
            //console.log(Object.values(req.files));
            for(let photo of Object.values(req.files).slice(0,3)){
                //console.log(photo);
                let photoName = await savePhotoUtils(photo,500);

                const photoId = await insertPhotoEntrieService(photoName, entryId);

                photos.push({
                    id: photoId,
                    name: photoName
                });  
            }
        }
        
        res.send({
            status: 'ok',
            data:{
                entry:{
                    id: entryId,
                    title,
                    place,
                    description,
                    userId,
                    photos,
                    createdAt: new Date()
                }
            }
        });

    } catch (error) {
        next(error);
    }
}

export default newEntryController;