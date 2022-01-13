import diaryData from '../../data/diaries';
import { DiaryEntry, NonSensativeDiaryEntry } from '../types';

const diaries: Array<DiaryEntry> = diaryData;

const getEntries = (): Array<DiaryEntry> => {
    return diaries;
};

const getNonSensativeEntries = (): NonSensativeDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id, date, weather, visibility
    }));
};

const addEntry = () => {
    return null;
};

export default {
    getEntries, addEntry, getNonSensativeEntries
};