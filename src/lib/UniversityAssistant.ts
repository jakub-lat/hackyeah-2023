import { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";
import OpenAI from "openai";
import { AssistantAnswer } from "./AssistantAnswer";
import { getOpenAIKey } from "./secrets";


export default class UniversityAssistant {
    messages: ChatCompletionMessageParam[] = [];
    isRunning = false;

    constructor() {
        const masterPrompt = `Jesteś doradcą dla absolwentów szkół średnich, którzy chcą dobrze wybrać kierunek studiów.
            Twoim zadaniem jest uzupełnienie dokumentu JSON w formacie 
            {"suggestedFieldsOfStudy": [...], "isAnyCityPreferred": true/false, "preferredCity": "miasto"/null, "partTimeStudies": true/false, "currentDegree": "none"|"bachelors"|"masters"}.
            Zadawaj pytania tak, aby jak najszybciej uzupełnić te dane i nie zadawaj pytań, na które już masz odpowiedź. 
            suggestedFieldOfStudy wywnioskuj na podstawie zainteresowań użytkownika, nie pytaj wprost o kierunki studiów.
            Odpowiedź na pytania podawaj zawsze w formacie {"answer": ..., "isDataGathered": true/false, "possibleResponses": [...]/null}.
            Pole possibleResponses uzupełniaj tylko wtedy, gdy Twoje pytanie ma mniej niż 4 możliwe odpowiedzi, niech każda odpowiedź będzie zwięzłym zdaniem w języku polskim.
            Jeśli uzupełniłeś już wszystkie pola JSON, odpowiedz podając ten obiekt w polu answer odpowiedzi i ustawiając isDataGathered na true.
            W przeciwnym wypadku ustaw isDataGathered na false, a answer ustaw na tekst Twojej odpowiedzi.`;
        this.messages.push({ role: 'system', content: masterPrompt })
        this.messages.push({ role: 'assistant', content: 'Cześć! Opowiedziałbyś mi o tym co lubisz robić w wolnym czasie?' })
    }

    async ask(prompt: string): Promise<AssistantAnswer> {
        const newPrompt = `Pamiętaj, żeby odpowiedzieć w formacie 
        {"answer": ..., "isDataGathered": true/false, "possibleResponses": [...]/null} i dalej zbierać informacje do wypełnienia dokumentu JSON, 
        chyba że już wszystkie są zebrane. 
        Jeśli possibleResponses nie jest nullem, niech będzie to lista możliwych odpowiedzi na Twoje pytanie zwięzłym zdaniem w języku polskim.
        Nie powtarzaj pytań, które zadałeś już wcześniej. Zdanie do odpowiedzi: ` + prompt;
        this.messages.push({ role: 'user', content: newPrompt });
        const openai = new OpenAI({
            apiKey: await getOpenAIKey(),
            dangerouslyAllowBrowser: true
        });
        const chatCompletion = await openai.chat.completions.create({
            messages: this.messages,
            model: 'gpt-4',
        });


        const answer = chatCompletion.choices[0].message;
        this.messages.push(answer);
        try {
            return JSON.parse(answer.content!) as AssistantAnswer;
        } catch (e) {
            return {
                answer: answer.content!,
                isDataGathered: false,
                possibleResponses: null,
            };
        }
    }
}

