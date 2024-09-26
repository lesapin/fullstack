type Operation = 'multiply' | 'add' | 'divide' ;

const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide':
      if (b === 0) throw new Error('can\'t multiply by 0');
      return a / b;
    default:
      throw new Error('Operation is not multiply, add or divide');
  }
}

try {
  console.log(calculator(1, 5, 'divide'));
} catch (error) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
