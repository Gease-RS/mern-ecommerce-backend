import express from "express";
import cookieParser from "cookie-parser";
import { connect, connection } from "mongoose";
import cors from "cors";
import config from "./config";
import router from "./routes";

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(router);

connect(config.moongose_url);
const db = connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
