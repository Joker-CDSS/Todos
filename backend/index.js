import express from "express";
import router from "./routes.js";
import dotenv from "dotenv";
import { connectToMongoDB } from "./database.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1", router);

const port = process.env.PORT || 7000;

async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}

startServer();
