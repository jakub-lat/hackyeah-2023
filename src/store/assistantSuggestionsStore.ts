import { AssistantSuggestion } from '@/lib/AssistantAnswer';
import { create } from 'zustand';

interface IAssistantSuggestionStore extends AssistantSuggestion {
    setSuggestion: (suggestion: AssistantSuggestion) => void,
}

export const useAssistantSuggestionsStore = create<IAssistantSuggestionStore>((set) => ({
    suggestedFieldsOfStudy: [],
    isAnyCityPreferred: false,
    preferredCity: null,
    partTimeStudies: null,
    setSuggestion: (suggestion: AssistantSuggestion) => set(suggestion),
    physicalWork: null,
    workingWithPeople: null,
}))