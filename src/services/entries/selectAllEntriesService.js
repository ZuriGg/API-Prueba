import getPool from "../../database/getPool.js";

const selectAllEntriesService = async () => {
    
    const pool = await getPool();

    const [entries] = await pool.query(
        `
            SELECT e.id, e.title, e.place, e.userId, u.email, AVG(IFNULL(v.value,0)) AS votes, e.createdAt
            FROM entries e
            LEFT JOIN entryVotes v ON v.entryId = e.id
            INNER JOIN users u ON u.id = e.userId
            GROUP BY e.id
            ORDER BY e.createdAt DESC
        `
    );

    for(let entry of entries){
        const [photos] = await pool.query(
            `
                SELECT id, name FROM entryPhotos WHERE entryId=?
            `,
            [entry.id]
        );

        entry.photos = photos
    }

    return entries;
}

export default selectAllEntriesService;