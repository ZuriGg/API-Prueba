import deleteEntryPhotoService from "../../services/entries/deleteEntryPhotoService.js";

const deleteEntryPhotoController = async (req, res, next) => {
    try {
        const {entryId, photoId} = req.params;

        await deleteEntryPhotoService(entryId, photoId);

        res.send({
            status: 'ok',
            message: 'Foto borrada'
        });

    } catch (error) {
        next(error);       
    }
}

export default deleteEntryPhotoController;