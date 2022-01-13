import { v4 as uuidv4 } from 'uuid';
import patientData from "../../data/patients";
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from "../types/patientsTypes";
import { isString } from '../utils';

const getPatientEntries = (): PatientEntry[] => {
    return patientData;
};

const getNonSensativePatientEntries = (): NonSensitivePatientEntry[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const postPatientEntry = (newPatient: NewPatientEntry): PatientEntry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const idString: unknown = uuidv4();
    const newPatientEntry = {
        id: isString(idString) ? idString : String(Math.floor(Math.random() * 10000000)),
        ...newPatient
    };
    patientData.push(newPatientEntry);
    return newPatientEntry;
};

export default { getPatientEntries, getNonSensativePatientEntries, postPatientEntry };