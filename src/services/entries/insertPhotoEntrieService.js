import getPool from "../../database/getPool.js";

const insertPhotoEntrieService = async (photoName, entryId) => {
    const pool = await getPool();
    const [result] = await pool.query(
        `
            INSERT INTO entryPhotos (name, entryId)
            VALUES (?,?)
        `,
        [photoName, entryId]
    );

    const { insertId } = result;

    return entryId;
}

export default insertPhotoEntrieService;