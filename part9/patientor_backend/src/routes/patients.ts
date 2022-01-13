import express from 'express';
import patientServices from '../services/patientsServices';
const pateientsRouter = express.Router();

pateientsRouter.get('/', (_req, res) => {
    const result = patientServices.getNonSensativePatientEntries();
    res.send(result);
});

pateientsRouter.post('/', (_req, res) => {
    res.send('Post');
});

export default pateientsRouter;