import express from "express";
import diaryService from "../services/diaryService";
const router = express.Router();

router.get('/', (_req, res) => {
    const result = diaryService.getNonSensativeEntries();
    res.send(result);
});

router.post('/', (_req, res) => {
    res.send('Post diaries');
});

export default router;