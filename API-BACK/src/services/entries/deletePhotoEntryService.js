import getPool from "../../database/getPool.js";
import { deletePhotoUtils } from "../../utils/photoUtils.js";

const deletePhotoEntryService = async (id) => {
    const pool = await getPool();

    //seleccionamos todas las fotos relacionadas, si las tuviera
    const [photos] = await pool.query(
        `
            SELECT name
            FROM entryphotos
            WHERE entryId=?
        `,
        [id]
    );

    //borramos las posibles fotos de la tabla entryphotos
    await pool.query(
        `
            DELETE FROM entryphotos
            WHERE entryId=?
        `,
        [id]
    );

    //si hay fotos, las eliminamos del disco
    if(photos.length){
        for(let photo of photos){
            await deletePhotoUtils(photo.name);
        }
    }

    //borramos los posibles votos de la tabla entryvotes
    await pool.query(`DELETE FROM entryvotes WHERE entryId=?`,[id]);

    //por último borramos la entrada de la tabla entries
    await pool.query(`DELETE FROM entries WHERE id=?`,[id]);
}

export default deletePhotoEntryService;