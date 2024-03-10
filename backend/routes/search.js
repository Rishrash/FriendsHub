import express from 'express';
import {MongoClient} from 'mongodb';
import UserSearch from '../controllers/SearchController';
const router = express.Router();
router.get('/search', UserSearch);

export default router;
