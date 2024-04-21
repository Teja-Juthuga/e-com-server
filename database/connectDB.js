const { MongoClient } = require("mongodb");

const url = "mongodb+srv://teja_071199:test@atlascluster.a4vovbu.mongodb.net/";
const client = new MongoClient(url);

const dbName = "eCommerceApp";

async function connectDB() {
    await client.connect();
    const db = client.db(dbName);
    console.log("Connected to " + dbName);
    return db
}

exports.connectDB = connectDB;