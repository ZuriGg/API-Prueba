import getPool from "../../database/getPool.js";

const selectEntryByIdService = async (entryId) => {
    const pool = await getPool();

    const [entry] = await pool.query(
        `
            SELECT e.id, e.title, e.place, e.userId, u.email, AVG(IFNULL(v.value,0)) AS votes, e.createdAt
            FROM entries e
            LEFT JOIN entryVotes v ON v.entryId = e.id
            INNER JOIN users u ON u.id = e.userId
            WHERE e.id=?
            GROUP BY e.id
        `,
        [entryId]
    );

    const [photos] = await pool.query(
        `
            SELECT id, name FROM entryPhotos WHERE entryId=?
        `,
        [entryId]
    );

    entry[0].photos = photos;

    return entry[0];
}

export default selectEntryByIdService;