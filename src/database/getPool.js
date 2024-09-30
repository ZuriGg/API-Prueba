import 'dotenv/config';
import mysql from 'mysql2/promise';

const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
} = process.env;

let pool;

const getPool = async () => {
    try {
        
        if(!pool){
            pool = mysql.createPool({
                connectionLimit: 10,
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME,
                timezone: 'Z'
            });
        }

        return await pool;

    } catch (error) {
        console.log(error);  
    }
}

export default getPool;