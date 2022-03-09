import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cookieParser from "cookie-parser";
import { connect, connection } from "mongoose";
import cors from "cors";
import config from "./config";
import routerRouter from "./routes/userRouter";
import routerCategory from "./routes/categoryRouter";

const app = express();
app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(routerRouter);
app.use(routerCategory);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: error.message,
    status: "Error",
  });
});

connect(config.uri, config.options);
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
