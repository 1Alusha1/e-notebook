import Words from "../model/words.js";

class WordsController {
  async getWrods(req, res) {
    try {
      const words = await Words.find();

      if (!words.length) {
        return res.status(404).json({ message: "not found" });
      }

      return res.status(200).json({ words });
    } catch (err) {
      if (err) throw err;
      res.status(500).json({ message: "Something wrong", err });
    }
  }
  async addNewWord(req, res) {
    const { word, translate } = req.body;

    try {
      if (!word || !translate) {
        return res
          .status(400)
          .json({ message: "You must fill word and translate" });
      }

      const newWord = await new Words({ ...req.body });
      await newWord.save();

      res.status(203).json({ message: "Word was saved", newWord });
    } catch (err) {
      if (err) throw err;
      res.status(500).json({ message: "Something wrong", err });
    }
  }
  async deleteWord(req, res) {
    const { id } = req.params;

    try {
      if (!id) {
        return res.status(400).json({ message: "word by  id doesn't exist" });
      }

      await Words.deleteOne({ _id: id });

      res.status(200).json({ message: "Word was deleted" });
    } catch (err) {
      if (err) throw err;
      res.status(500).json({ message: "Something wrong", err });
    }
  }
  async updateWord(req, res) {
    const { id } = req.params;

    try {
      await Words.updateOne(
        { _id: id },
        {
          $set: {
            ...req.body,
          },
        },
        { new: true }
      );

      return res.status(200).json({ message: "Word was updated" });
    } catch (err) {
      if (err) throw err;
      res.status(500).json({ message: "Something wrong", err });
    }
  }

  async getRandomWords(req, res) {
    try {
      const randomWord = await Words.aggregate([{ $sample: { size: 3 } }]);

      const randomNumber = Math.floor(Math.random() * 2);

      let dto = {};

      if (randomNumber % 2 === 0) {
        dto = {
          question: randomWord[0].word,
          suggestedAnswer: [...randomWord].map((i) => i.translation),
        };
      } else {
        dto = {
          question: randomWord[0].translation,
          suggestedAnswer: [...randomWord].map((i) => i.word),
        };
      }

      res.status(200).json(dto);
    } catch (err) {
      if (err) throw err;
      res.status(500).json({ message: "Something wrong", err });
    }
  }

  async chechAnswer(req, res) {
    const { question, answer } = req.body;

    try {
      const words = await Words.findOne({
        $or: [{ word: question }, { translation: question }],
      });

      if (words.word === answer || words.translation === answer) {
        return res.status(200).json({ message: "Success" });
      }
      return res.status(200).json({ message: "Fail, try one more time" });
    } catch (err) {
      if (err) throw err;
      res.status(500).json({ message: "Something wrong", err });
    }
  }

  async lookFoWord(req, res) {
    const { query } = req.query;
    try {
      const words = await Words.find({
        $or: [
          { word: { $regex: query.toLowerCase(), $options: "i" } },
          { translation: { $regex: query.toLowerCase(), $options: "i" } },
        ],
      });
      res
        .status(200)
        .json({ message: "Words that have been found", data: words });
    } catch (err) {
      if (err) throw err;
      res.status(500).json({ message: "Something wrong", err });
    }
  }
}

export default new WordsController();
