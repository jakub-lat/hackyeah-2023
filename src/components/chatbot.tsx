import { useState } from 'react';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
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

            <div className="flex mt-1 gap-2">
                <Input
                    className="text-white placeholder-red px-12"
                    value={currentMessage}
                    onChange={e => setCurrentMessage(e.target.value)}
                    placeholder="Wpisz..."
                />
                <Button
                    className="grow w-40"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Odpowiedz
                </Button>
            </div>
        </div>
    );
}