import getPool from "../database/getPool.js";
import generateErrorsUtils from "../utils/generateErrorsUtils.js";


const entryExists = async (req, res, next) => {
    try {
        
        const pool = await getPool();

        const {entryId} = req.params;

        const [entry] = await pool.query(
            `
                SELECT id FROM entries WHERE id=?
            `,
            [entryId]
        );

        if(!entry.length) throw generateErrorsUtils('Entrada no encontrada', 404);

        next();// este next SI O SI

    } catch (error) {
        next(error);
    }
}

export default entryExists;