import deletePhotoEntryService from "../../services/entries/deletePhotoEntryService.js";

const deleteEntryController = async (req, res, next) => {
    try {
        const {entryId} = req.params;

        await deletePhotoEntryService(entryId);

        res.send({
            status: 'ok',
            message: `La entrada con id ${entryId} y todos sus elementos fueron eliminados`
        });

    } catch (error) {
        next(error)
    }
};

export default deleteEntryController;