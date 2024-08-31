import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/todosdb";

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;

const connectToMongoDB = async () => {
  if (!client) {
    try {
      client = await MongoClient.connect(uri, options);
      console.log("connected to mongoDB");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  return client;
};

const getConnectedClient = () => client;

export { connectToMongoDB, getConnectedClient };
