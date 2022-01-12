type Operation = `multiply` | `add` | `divide`;
type Result = number;

// const a: number = Number(process.argv[2])
// const b: number = Number(process.argv[3])

export const calculator = (a: number, b: number, operation: Operation): Result => {
    switch (operation) {
        case 'multiply':
            return a * b;
        case 'add':
            return a + b;
        case 'divide':
            if (b === 0) throw new Error('Err: can\'t divide by 0!');
            return a / b;
        default:
            throw new Error('Invalid operation!');
    }
};

try {
    console.log(calculator(2, 3, 'add'));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

console.log(process.env);