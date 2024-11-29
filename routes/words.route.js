import { Router } from "express";
import WordsController from "../controller/words.controller.js";

const router = Router();

router.get("/", WordsController.getWrods);

router.get("/random-words", WordsController.getRandomWords);

router.get("/look-for-words", WordsController.lookFoWord);

router.post("/new-word", WordsController.addNewWord);

router.post("/check-answer", WordsController.chechAnswer);

router.delete("/delete-word/:id", WordsController.deleteWord);

router.patch("/update-word/:id", WordsController.updateWord);

export default router;
