import { NewDiaryEntry, Weather, Visibility } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isWeather = (param: any): param is Weather => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Weather).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isVisibility = (param: any): param is Visibility => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Visibility).includes(param);
};

const parseComment = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
        throw new Error('Incorrect or missing comment ');
    }
    return comment;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date ');
    }
    return date;
};

const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather ' + weather);
    }
    return weather;
};

const parseVisibility = (visibility: unknown): Visibility => {
    if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility ' + visibility);
    }
    return visibility;
};


type Fields = { date: unknown, weather: unknown, visibility: unknown, comment: unknown };

const toNewDiaryEntry = ({ date, weather, visibility, comment } : Fields): NewDiaryEntry => {
    const newEntry: NewDiaryEntry = {
        date: parseDate(date),
        weather: parseWeather(weather),
        visibility: parseVisibility(visibility),
        comment: parseComment(comment)
    };
    return newEntry;
};


export default toNewDiaryEntry;