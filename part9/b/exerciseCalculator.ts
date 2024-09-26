import { isNotNumber } from './utils';

export interface Summary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgs = (args: string[]): Summary => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = args[2];
  
  args.splice(0, 3);
  const daily = args;

  if (!isNotNumber(target) && daily.reduce((acc: boolean, cur: string) => acc && !isNotNumber(cur), true)) {
    return calculateExercises(daily.map(val => Number(val)), Number(target));
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (daily: number[], target: number): Summary => {
  const periodLength = daily.length;
  const average = daily.reduce((acc: number, cur: number) => acc + cur, 0) / periodLength;
  
  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "Daily exercise target reached!";
  }
  else if (target - average <= 1) {
    rating = 2;
    ratingDescription = "You almost reached the daily exercise target";
  }
  else {
    rating = 1;
    ratingDescription = "You didn't reach the daily exercise target, try again next week!";
  }

  return {
    periodLength,
    trainingDays: daily.filter(hours => hours > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average  
  };
};

try {
  console.log(parseArgs(process.argv));
} catch (error: unknown) {
  let errorMsg = 'Something bad happened.';
  if (error instanceof Error) {
    errorMsg += ' Error: ' + error.message;
  }
  console.log(errorMsg);
}
