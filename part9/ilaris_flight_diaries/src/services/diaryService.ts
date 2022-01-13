import diaryData from '../../data/diaries';
import { DiaryEntry, NonSensativeDiaryEntry, NewDiaryEntry } from '../types';

const diaries: Array<DiaryEntry> = diaryData;

const getDiaries = (): Array<DiaryEntry> => {
    return diaries;
};

const getNonSensativeDiaries = (): NonSensativeDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id, date, weather, visibility
    }));
};

const findDiaryById = (id: number): DiaryEntry | undefined => {
    const entry = diaryData.find(diary => diary.id === id);
    return entry;
};

const addDiary = ( entry: NewDiaryEntry ): DiaryEntry => {
    const newDiaryEntry = {
        id: Math.max(...diaryData.map(diary => diary.id)) + 1,
        ...entry
    };
    diaryData.push(newDiaryEntry);
    return newDiaryEntry;
};

export default {
    getDiaries, addDiary, getNonSensativeDiaries, findDiaryById
};