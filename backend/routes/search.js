import express from 'express';
import {MongoClient} from 'mongodb';
const router = express.Router();
router.get('/search', async (req, res) => {
    const client = new MongoClient(process.env.DATABASE_URL, { useNewUrlParser: true });

    try {
        await client.connect();

        const database = client.db('friendshub_database');
        const usersCollection = database.collection('useraccounts');

        const searchQuery = req.query.q;

        const searchResults = await usersCollection.aggregate([
            {
                $search: {
                    index: 'searchUsers',
                    text: {
                        query: searchQuery,
                        path: {
                            wildcard: '*'
                        }
                    }
                }
            }
        ]).toArray();

        res.json(searchResults);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await client.close();
    }
});

export default router;
