interface MultiplyValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
    if(args.length < 4) throw new Error('You are missing input(s)! Please input 2 numbers!');
    if(args.length > 4) throw new Error('You are putting too many inputs! Please input only 2 numbers!');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return { value1: Number(args[2]), value2: Number(args[3])};
    } else {
        throw new Error('You have to input numbers!');
    }
};

const multiplicator = (first: number, second: number, printText: string) => {
    return console.log(printText, first*second);
};


try {
    const { value1, value2 } = parseArguments(process.argv);
    multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is: `);
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}