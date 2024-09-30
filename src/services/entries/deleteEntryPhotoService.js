import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import { deletePhotoUtils } from "../../utils/photoUtils.js";

const deleteEntryPhotoService = async (entryId, photoId) => {
    const pool = await getPool();

    //buscamos la foto que estamos intentando eliminar
    const [current] = await pool.query(
        `
            SELECT name FROM entryphotos
            WHERE id=? AND entryId=?
        `,
        [photoId, entryId]
    );

    //si la foto no existe devolvemos un error
    if(current.length === 0){
        throw generateErrorsUtils('La foto no existe', 404);
    }

    //borramos la foto del disco
    await deletePhotoUtils(current[0].name);

    //borramos la foto de la base de datos
    await pool.query(
        `
            DELETE FROM entryphotos
            WHERE id=? AND entryId=?
        `,
        [photoId, entryId]
    );
}

export default deleteEntryPhotoService;