const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri, { useUnifiedTopology: true });

client.connect();

const getFriends = async (callback) => {
    try {
        // await client.connect();

        const database = client.db('game');
        const collection = database.collection('users');
        const query = { name: 'Daniel' };
        const result = await collection.findOne(query);

        callback(null, result);

    } catch (error) {
        console.log('Error finding user: ', error);
        callback(error);
    } finally {
        // await client.close();
    }
}

const updateFriends = async (name) => {
    try {
        // await client.connect();

        const database = client.db('game');
        const collection = database.collection('users');
        const filter = { name: "Daniel" };
        const updateDoc = {
            $push: {
                friends: `${name}`
            }
        }
        const result = await collection.updateOne(filter, updateDoc);

        console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
        );
    } catch (error) {
        console.log('Error updating user: ', error);
    } finally {
        // await client.close();
    }
};

module.exports = {
    getFriends,
    updateFriends
};