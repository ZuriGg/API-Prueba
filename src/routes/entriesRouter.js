import express from 'express';

import newEntryController from '../controllers/entries/newEntryController.js';
import listEntriesController from '../controllers/entries/listEntriesController.js';
import getEntryController from '../controllers/entries/getEntryController.js';
import editEntryController from '../controllers/entries/editEntryController.js';
import addEntryPhotoController from '../controllers/entries/addEntryPhotoController.js';
import voteEntryController from '../controllers/entries/voteEntryController.js';
import deleteEntryController from '../controllers/entries/deleteEntryController.js';
import deleteEntryPhotoController from '../controllers/entries/deleteEntryPhotoController.js';

import authUser from '../middlewares/authUser.js';
import entryExists from '../middlewares/entryExists.js';
import cantEdit from '../middlewares/cantEdit.js';

const entriesRouter = express.Router();

entriesRouter.post('/entries', authUser, newEntryController);

entriesRouter.get('/entries', listEntriesController);
entriesRouter.get('/entries/:entryId', entryExists, getEntryController)

entriesRouter.put('/entries/:entryId/edit', 
    authUser, 
    entryExists, 
    cantEdit, 
    editEntryController
);

entriesRouter.put('/entries/:entryId/photos',
    authUser,
    entryExists,
    cantEdit,
    addEntryPhotoController
);

entriesRouter.post('/entries/:entryId/votes',
    authUser,
    entryExists,
    voteEntryController
);

//borra una entrada
entriesRouter.delete('/entries/:entryId',
    authUser,
    entryExists,
    cantEdit,
    deleteEntryController
);

//borra una imágen determinada de una entrada específica
entriesRouter.delete('/entries/:entryId/photos/:photoId',
    authUser,
    entryExists,
    cantEdit,
    deleteEntryPhotoController
);
export default entriesRouter;