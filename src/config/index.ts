import * as dotenv from "dotenv";

dotenv.config();

const moongose_url =
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.fym2b.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority` ||
  "mongodb://localhost:27017/";

const config = {
  moongose_url,
};

export default config;
