// import { every, isString } from 'lodash';

interface ExerciseValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number
}

interface RatingValues {
    rating: number;
    description: string;
}

export const parseArgumentsExercise = (exerciseHours: Array<number>): Array<number> => {
    if (exerciseHours.length < 1) throw new Error('Parameters missing.');
    else return exerciseHours;
};

const ratingScore = (averageTrainingHours: number, targetHours: number): RatingValues => {
    if (averageTrainingHours >= targetHours) return { rating: 3, description: 'Excellent!!! Keep the motivation high!' };
    else if (averageTrainingHours < targetHours && averageTrainingHours >= 1.5) return { rating: 2, description: 'It is good! But you can make it better!' };
    else return { rating: 1, description: 'You need to boost your motivation or you will never make it!' };
};

const stats = (exerciseHours: Array<number>) => {
    const trainingDays = 7 - exerciseHours.filter(hour => hour === 0).length;
    const sumOfTrainingHours = exerciseHours.reduce((a, b) => a + b);
    const averageTrainingHours = sumOfTrainingHours / exerciseHours.length;
    return { trainingDays, averageTrainingHours };
};

export const exerciseCalculator = (exerciseHours: Array<number>, targetHoursDaily: number): ExerciseValues => {
    const {trainingDays, averageTrainingHours} = stats(exerciseHours);
    const { rating, description } = ratingScore(averageTrainingHours, targetHoursDaily);
    const reachSuccess = rating === 3 ? true : false;
    return {
        periodLength: exerciseHours.length,
        trainingDays: trainingDays,
        success: reachSuccess,
        rating: rating,
        ratingDescription: description,
        target: targetHoursDaily,
        average: averageTrainingHours
    };
};
