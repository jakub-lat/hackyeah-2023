export interface AssistantSuggestion {
    suggestedFieldsOfStudy: string[],
    isAnyCityPreferred: boolean,
    preferredCity: string | null,
    partTimeStudies: boolean | null,
}

export interface AssistantAnswer {
    answer: string | AssistantSuggestion,
    isDataGathered: boolean,
    possibleResponses: string[] | null;
}
