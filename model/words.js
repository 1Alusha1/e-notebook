import mongoose from "mongoose";

const wordsShema = new mongoose.Schema({
  word: String,
  translation: String,
  description: {
    type: String,
    required: false,
  },
});

const Words = mongoose.model("Words", wordsShema);

export default Words;
