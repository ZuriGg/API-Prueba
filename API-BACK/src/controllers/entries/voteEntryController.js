import selectEntryByIdService from "../../services/entries/selectEntryByIdService.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import insertVoteEntryService from "../../services/entries/insertVoteEntryService.js";

const voteEntryController = async (req, res, next) => {
    try {
        
        const { entryId } = req.params;
        const { value } = req.body;

        const entry = await selectEntryByIdService(entryId);

        if(entry.userId === req.user.id){
            throw generateErrorsUtils('No puede votar su propia entrada', 409);
        }

        const avgVote = await insertVoteEntryService(value, entryId, req.user.id);

        res.send({
            status: 'ok',
            data: avgVote
        });

    } catch (error) {
        next(error);
    }
}

export default voteEntryController;