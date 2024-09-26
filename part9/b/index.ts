import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: 'malformatted parameters' });
  } else {
    res.send({ weight, height, bmi: calculateBmi(height, weight) });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  const exercises = daily_exercises as number[];

  if (!exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
  } else if (isNaN(Number(target)) || !exercises.reduce((acc: boolean, cur: number) => acc && !isNaN(cur), true)) {
    res.status(400).send({ error: 'malformatted parameters' }); 
  } else {
    const response = calculateExercises(exercises, Number(target));
    console.log(response);
    res.send(response);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
