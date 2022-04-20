import { Schedule } from "./Schedule"

export type Tournament = {
    id:                 number,
    themeId:            number,
    nameKey:            string,
    schedule:           Schedule[],
    nameKeySecondary:	string,
}