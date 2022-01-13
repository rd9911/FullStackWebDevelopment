import express from 'express';
// import { diagnosesData } from '../../data/diagnoses';
// import { DiagnoseEntry } from '../types/diagnoseTypes';
import diagnoseServices from '../services/diagnoseServices';
const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
    const result = diagnoseServices.getDiagnoses();
    res.send(result);
});

diagnosesRouter.post('/', (_req, res) => [
    res.send('Post')
]);


export default diagnosesRouter;