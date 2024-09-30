import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const insertVoteEntryService = async (value, entryId, userId) => {
    const pool = await getPool();

    //comprobar que no exista una votación registrada de este usuario para esta entrada
    const [votes] = await pool.query(
        `
            SELECT id FROM entryvotes
            WHERE userId=? AND entryId=?
        `,
        [userId, entryId]
    );

    if(votes.length){
        throw generateErrorsUtils('No se puede votar mas de una vez la misma entrada', 409);
    }

    await pool.query(
        `
            INSERT INTO entryvotes (value, entryId, userId)
            VALUES (?, ?, ?)
        `,
        [value, entryId, userId]
    );

    const [avgVotes] = await pool.query(
        `
            SELECT AVG(value) AS avg FROM entryvotes WHERE entryId=?
        `,
        [entryId]
    );

    return Number(avgVotes[0].avg);
}

export default insertVoteEntryService;