import * as dotenv from "dotenv";

dotenv.config();

const uri =
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.fym2b.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority` ||
  "mongodb://localhost:27017/";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const config = {
  uri,
  options,
};

export default config;
