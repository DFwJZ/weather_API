const { MongoClient } = require("mongodb");

const MongoUtils = () => {
  const mu = {};
  const url = "mongodb://localhost:27017";
  const dbName = "weather_api";
  const colName = "request_history";

  let db;
  let client;

  // Function to connect to the database
  mu.connect = async () => {
    if (!db) {
      client = new MongoClient(url);
      await client.connect();
      db = client.db(dbName);
    }
    return db;
  };

  // count the number of request history documents
  mu.countRequests = async () => {
    try {
      const database = await mu.connect();
      const collection = database.collection(colName);
      return await collection.countDocuments();
    } catch (error) {
      console.error("Error in countRequests:", error);
      throw error;
    }
  };

  // Example function to find appointments
  mu.findAllRequests = async () => {
    try {
      const db = await mu.connect();
      const collection = db.collection(colName);
      return await collection.find().sort({ date: -1 }).limit(10).toArray();
    } catch (error) {
      console.error("Error in findAllRequests:", error);
      throw error;
    }
  };

  // Insert a new request
  mu.insertRequest = async (city) => {
    const db = await mu.connect();
    const collection = db.collection(colName);
    return collection.insertOne({ city, date: new Date() });
  };

  return mu;
};

module.exports = MongoUtils();
