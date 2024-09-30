import selectEntryByIdService from "../services/entries/selectEntryByIdService.js";
import generateErrorsUtils from "../utils/generateErrorsUtils.js";


const cantEdit = async (req, res, next) => {
    try {
        
        const { entryId } = req.params;

        const entry = await selectEntryByIdService(entryId);

        if(entry.userId !== req.user.id) throw generateErrorsUtils('Usuario no autorizado para realizar esta  operacion', 409);

        next();

    } catch (error) {
        next(error);
    }
}

export default cantEdit;