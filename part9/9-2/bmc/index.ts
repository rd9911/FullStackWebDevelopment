/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
  

import { parseArguments, bmcalc } from './bmcalc';
import { parseArgumentsExercise, exerciseCalculator } from './exerciseCalc';

app.get('/hello', (_req, res) => {
    res.send('Hello World!');
});

app.get('/bmi', (req, res) => {
    const heightQry = req.query.height?.toString();
    const weightQry = req.query.weight?.toString();
    console.log(typeof heightQry, typeof weightQry);
    if (heightQry && weightQry) {
        const { mass, height } = parseArguments(weightQry, heightQry);
        const result = bmcalc(mass, height);
        res.send(result);
    } else {
        res.send({error: 'Malformatted parametres.'});
    }
});

app.post('/body-mass', (req, res) => {
    console.log(req.body);
    const dailyExercises: Array<number> = req.body.dailyExercises;
    const target: number = req.body.target;
    const parsedDailyExercises = parseArgumentsExercise(dailyExercises);
    try {
        const result = exerciseCalculator(parsedDailyExercises, target);
        res.send(result);
    } catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error ' + error.message;
        }
        res.sendStatus(400).send({ error: errorMessage });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});