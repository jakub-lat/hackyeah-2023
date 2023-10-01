export interface AssistantSuggestion {
    suggestedFieldsOfStudy: string[],
    isAnyCityPreferred: boolean,
    preferredCity: string | null,
    partTimeStudies: boolean | null,
    workingWithPeople: boolean | null,
    physicalWork: boolean | null,
}

export interface AssistantAnswer {
    answer: string | AssistantSuggestion,
    isDataGathered: boolean,
    possibleResponses: string[] | null;
}
