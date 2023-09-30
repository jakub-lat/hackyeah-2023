export interface AssistantSuggestion {
    suggestedFieldsOfStudy: string[],
    isAnyCityPreferred: boolean,
    preferredCity: string | null,
    partTimeStudies: boolean,
    currentDegree: "none" | "bachelors" | "masters",

}

export interface AssistantAnswer {
    answer: string | AssistantSuggestion,
    isDataGathered: boolean,
    possibleResponses: string[] | null;
}
