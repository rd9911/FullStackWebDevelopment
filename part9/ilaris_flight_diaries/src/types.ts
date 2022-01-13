export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloud = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
}
export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
}


export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string;
}

export type NonSensativeDiaryEntry = Omit<DiaryEntry , 'comment'>;

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;