import { NewPatientEntry, Gender } from "./types/patientsTypes";

export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDateOfBirth = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isSsn = (ssn: unknown): ssn is string => {
    return typeof ssn === 'string' || ssn instanceof String;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
};

const isOccupation = (occupation: unknown): occupation is string => {
    return typeof occupation === 'string' || occupation instanceof String;
};

const parseName = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error('Name is incorrect type or missing ');
    }
    return text;
};

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDateOfBirth(date) ) {
        throw new Error('Date is incorrect type or missing ' + date);
    }
    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isSsn(ssn)) {
        throw new Error('Ssn is incorrect type or missing ');
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Gender is incorrect type or missing ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isOccupation(occupation)) {
        throw new Error('occupation is incorrect type or missing ' + occupation);
    }
    return occupation;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateNewPatient = (requestBodyObj: any): NewPatientEntry => {
    const newEntry = {
        name: parseName(requestBodyObj.name),
        dateOfBirth: parseDateOfBirth(requestBodyObj.dateOfBirth),
        ssn: parseSsn(requestBodyObj.ssn),
        gender: parseGender(requestBodyObj.gender),
        occupation: parseOccupation(requestBodyObj.occupation)
    };
    return newEntry;
};

export default validateNewPatient;