import selectEntryByIdService from "../../services/entries/selectEntryByIdService.js";

const getEntryController = async (req,res,next) => {
    try {
        
        const { entryId } = req.params;

        const entry = await selectEntryByIdService(entryId);

        res.send({
            status: 'ok',
            data: entry
        });

    } catch (error) {
        next(error);
    }
}

export default getEntryController;