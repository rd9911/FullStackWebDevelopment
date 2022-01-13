import express from 'express';
import patientsRouter from './routes/patients';
import diagnosesRouter from './routes/diagnoseRoute';
import cors from 'cors';
const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});


app.use('/api/patients', patientsRouter);
app.use('/api/diagnoses', diagnosesRouter);



const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});