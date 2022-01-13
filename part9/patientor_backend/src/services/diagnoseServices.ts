import { diagnosesData } from "../../data/diagnoses";
import { DiagnoseEntry } from "../types/diagnoseTypes";

const getDiagnoses = (): DiagnoseEntry[] => {
    return diagnosesData;
};

const postDiagnose = () => {
    return 'hi';
};

export default { getDiagnoses, postDiagnose };