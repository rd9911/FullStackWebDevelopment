type ResultDescription = 'Underweight' | 'Normal' | 'Overweight';

interface Result {
    description: ResultDescription;
    result: number
}

interface CalculatorValues {
    mass: number;
    height: number
}

export const parseArguments = (mass: string, height: string): CalculatorValues => {
    // if (args.length < 2) throw new Error('Not enough args.')
    // else if (args.length > 2) throw new Error('Too many args.')
    if (!isNaN(Number(mass)) && !isNaN(parseFloat(height))) return { mass: Number(mass), height: parseFloat(height) };
    else throw new Error('You should provide numbers!');
};


export const bmcalc = (mass: number, height: number): Result => {
    const result = mass / Math.pow(height, 2);
    if ( result < 18.5 ) return { description: 'Underweight', result: result };
    else if ( result > 18.4 && result < 25 ) return { description: 'Normal', result: result };
    else return { description: 'Overweight', result: result };
};

// const { mass, height } = parseArguments(process.argv)

// bmcalc(mass, height)