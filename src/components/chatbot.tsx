import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Bot, User } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Input } from '@/components/ui/input.tsx';
import LoadingButton from './ui/loading-button';
import { useNavigate } from 'react-router-dom';
import UniversityAssistant from '@/lib/UniversityAssistant';
import { useMemo, useRef, useEffect } from 'react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


export default function Chatbot() {
    const [messages, setMessages] = useState<{ message: string, bot: boolean }[]>([{
        message: "Cześć! Opowiedziałbyś mi o tym co lubisz robić w wolnym czasie?",
        bot: true
    }]);

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [messages]);

    const [textAnswer, setTextAnswer] = useState('');
    const [choicesAnswer, setChoicesAnswer] = useState<string[] | null>(null);
    const [choiceAnswer, setChoiceAnswer] = useState<string | null>(null);
    const { theme } = useTheme()
    const assistant = useMemo(() => new UniversityAssistant(), []);
    const [isLoading, setLoading] = useState(false);
    const [isDataGathered, setDataGathered] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = () => {
        if (textAnswer.trim() || choiceAnswer.trim()) {
            const answer = choiceAnswer ?? textAnswer;
            setTextAnswer('');
            setChoicesAnswer(null)
            setChoiceAnswer(null)

            setLoading(true)

            setMessages(prev => [
                ...prev,
                { message: answer, bot: false },
            ]);

            assistant.ask(answer).then((res) => {
                if (res.isDataGathered) {
                    setDataGathered(true);

                    setMessages(prev => [
                        ...prev,
                        { message: "Dziękuje za Twoje odpowiedzi. Przygotowałem dla Ciebie kilka propozycji. Kliknij kontynuuj, aby je zobaczyć." as string, bot: true }
                    ]);
                }
                else {
                    

                    if (res.possibleResponses) {
                        setChoicesAnswer(res.possibleResponses)
                    }

                    setMessages(prev => [
                        ...prev,
                        { message: res.answer as string, bot: true }
                    ]);
                }

                setTextAnswer('');
                setLoading(false)
            })
        }
    };

    return (
        <div className="my-4 flex flex-col gap-y-2 mx-auto w-full lg:max-w-[60%]">

            {messages.map(({ message, bot }, i) => (
                <Card key={i}>
                    <CardHeader>
                        <div className="flex gap-2 px-3">
                            {bot ?
                                <Bot className='w-6 h-6' color={theme === "dark" ? "white" : "black"} /> :
                                <User className='w-6 h-6' color={theme === "dark" ? "white" : "black"} />
                            }
                            <h1>{bot ? "Asystent" : "Ty"}</h1>
                        </div>
                    </CardHeader>
                    <CardContent className="mx-3">
                        <p className="text-muted-foreground">{message}</p>
                    </CardContent>
                </Card>
            ))}
            <div ref={messagesEndRef}></div>
            <div>
                <div className='flex mt-1 gap-2 items-center'>
                    {choicesAnswer !== null ? (
                        <RadioGroup value={choiceAnswer} onValueChange={e => setChoiceAnswer(e)}>
                            {choicesAnswer.map((choice, i) => (
                                <div className="flex items-center space-x-2 p-2" key={i}>
                                    <RadioGroupItem value={choice} id={`choice${i}`} />
                                    <Label htmlFor={`choice${i}`}>{choice}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    ) : (
                        <Input
                            className="placeholder-red px-7 h-14"
                            value={textAnswer}
                            disabled={isLoading}
                            onChange={e => setTextAnswer(e.currentTarget.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    handleSubmit();
                                }
                            }}
                            placeholder="Wiadomość"
                        />
                    )}

                    <LoadingButton
                        className="w-40 h-14 ml-auto"
                        color="primary"
                        onClick={isDataGathered ? () => navigate('/universities') : handleSubmit}
                        isLoading={isLoading}
                        disabled={isDataGathered}
                    >
                        {isDataGathered ? "Kontynuuj" : "Wyślij"}
                    </LoadingButton>
                </div>
            </div>
        </div>
    );
}