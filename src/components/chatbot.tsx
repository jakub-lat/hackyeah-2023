import { useState } from 'react';
import { Input } from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Bot, BotIcon, ChevronRight, School2 } from "lucide-react";
import { useTheme } from "@/components/theme-provider";


interface IQuestion {
    title: string,
    subtitle?: string,
    type?: string,
    options?: string[]
}


export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const { theme } = useTheme()

    const handleSubmit = () => {
        if (currentMessage.trim()) {
            setMessages(prev => [...prev, currentMessage]);
            setCurrentMessage('');
        }
    };

    return (
        <div>
            {messages.map((message, index) => (
                <Card>
                    <CardHeader>
                        {message}
                    </CardHeader>
                    <CardDescription>
                        Test test
                    </CardDescription>
                    <CardContent>
                        
                        Test test 2
                    </CardContent>
                </Card>
            ))}
        <div className="px-14 py-2">

            <div className="flex gap-2 py-4">
                <Bot color={theme === "dark" ? "white" : "black"} />
                <h1>Lubisz placki?</h1>
            </div>

            <div>
            <Input
                value={currentMessage}
                onChange={e => setCurrentMessage(e.target.value)}
                placeholder="Wpisz..."
            />
            <Button
                className="my-4"
                color="primary"
                onClick={handleSubmit}
            >
                Odpowiedz
            </Button>
            </div>
            </div>
        </div>
    );
}