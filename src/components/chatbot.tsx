import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Bot, BotIcon, ChevronRight, School2 } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import Textbox from "../components/textbox";
import UniversityAssistant from '@/lib/UniversityAssistant';
import { useMemo } from 'react';


interface IQuestion {
    question: string,
    type?: string,
    options?: string[]
}

const assistant = useMemo(() => new UniversityAssistant(), []);

function getNextAnswer(userAnswer: string) {
    return assistant.ask(userAnswer);
}


export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const { theme } = useTheme()

    // const [question, setQuestion] = useState({});

    const handleSubmit = () => {
        if (currentMessage.trim()) {
            setMessages(prev => [...prev, currentMessage]);
            setCurrentMessage('');
        }
    };

    return (
        <div className="my-4">
            {messages.map((message, index) => (
                <Card>
                <CardHeader>
                    <div className="flex gap-2 px-6">
                        <Bot color={theme === "dark" ? "white" : "black"} />
                        <h1>Wolisz samorozwój czy zdobycie zawodu?</h1>
                    </div>
                </CardHeader>
                <CardContent className="mx-6">
                    <p className=" text-gray-700">{message}</p>
                </CardContent>
                </Card>
            ))}

            <Card>
                <CardHeader>
                    <div className="flex gap-2 px-6">
                        <Bot color={theme === "dark" ? "white" : "black"} />
                        <h1>Wolisz samorozwój czy zdobycie zawodu?</h1>
                    </div>
                </CardHeader>
            </Card>

            <div>
               <Textbox 
               currentMessage={currentMessage} 
               setCurrentMessage={setCurrentMessage} 
               handleSubmit={handleSubmit} />
            </div>
        </div>
    );
}