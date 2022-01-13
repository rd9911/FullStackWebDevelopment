import { patientData } from "../../data/patients";
import { NonSensitivePatientEntry, PatientEntry } from "../types/patientsTypes";

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

const postPatientEntry = () => {
    return 'hi';
};

export default { getPatientEntries, getNonSensativePatientEntries, postPatientEntry };