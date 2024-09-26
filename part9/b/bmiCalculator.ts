const parseArgs = (args: string[]): string => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return calculateBmi(Number(args[2]), Number(args[3]));
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM); 

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal weight';
  } else if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

if (require.main === module) {
  try {
    console.log(parseArgs(process.argv));
  } catch (error: unknown) {
    let errorMsg = 'Something bad happened.';
    if (error instanceof Error) {
      errorMsg += ' Error: ' + error.message;
    }
    console.log(errorMsg);
  }
}
