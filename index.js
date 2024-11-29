import express from "express";
import connectDB from "./db/connect.js";
import cors from "cors";
import dotenv from "dotenv";
import wordsRouter from "./routes/words.route.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/words", wordsRouter);

const startSever = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
  } catch (err) {
    if (err) throw err;
  }

  app.listen(process.env.PORT, () =>
    console.log(`Server has started on ${process.env.PORT}`)
  );
};

startSever();
