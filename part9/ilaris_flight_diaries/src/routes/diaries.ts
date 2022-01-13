import express from "express";
import diaryService from "../services/diaryService";
import toNewDiaryEntry from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
    const result = diaryService.getNonSensativeDiaries();
    res.send(result);
});

router.get('/:id', (req, res) => {
    const diary = diaryService.findDiaryById(Number(req.params.id));
    if (diary) {
        res.send(diary);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newDiaryEntry = toNewDiaryEntry(req.body);
        const addedEntry = diaryService.addDiary(newDiaryEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong. ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
});

export default router;