import express from 'express';
const app = express();
// import { calculator } from './calculator';

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/calculate', (_req, res) => {
    // const { value1, value2, op } = req.body;
    // const result = calculator(value1, value2, op);
    res.send('Hi');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});