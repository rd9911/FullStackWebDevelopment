import express from 'express';
import patientServices from '../services/patientsServices';
import validateNewPatient from '../utils';
const pateientsRouter = express.Router();

pateientsRouter.get('/', (_req, res) => {
    const result = patientServices.getNonSensativePatientEntries();
    res.send(result);
});

pateientsRouter.post('/', (req, res) => {
    const newPatient = validateNewPatient(req.body);
    const addedPatient = patientServices.postPatientEntry(newPatient);
    res.send(addedPatient);
});

export default pateientsRouter;