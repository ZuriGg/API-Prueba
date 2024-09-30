import getPool from "../../database/getPool.js";

const updateUserService = async (firstName, lastName, userId) => {

    const pool = await getPool();

    await pool.query(
        `
            UPDATE users
            SET firstName=?, lastName=?
            WHERE id=?
        `,
        [firstName, lastName, userId]
    );
}

export default updateUserService;