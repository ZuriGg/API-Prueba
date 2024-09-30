import getPool from "../../database/getPool.js";

const editEntryService = async (title, place, description, entryId) => {
    const pool = await getPool();

    await pool.query(
        `
            UPDATE entries
            SET title=?, place=?, description=?
            WHERE id=?
        `,
        [title, place, description, entryId]
    );

}

export default editEntryService;