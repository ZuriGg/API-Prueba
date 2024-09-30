
import editEntryService from "../../services/entries/editEntryService.js";

const editEntryController = async (req, res, next) => {
    try {
        
        const {entryId} = req.params;

        const {title, place, description} = req.body;

        await editEntryService(title, place, description, entryId);

        res.send({
            status: 'ok',
            message: 'Entrada actualizada'
        });

    } catch (error) {
        next(error);
    }
}

export default editEntryController;