import { useState } from 'react';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
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

            <div className="flex mt-1">
                        <Input
                            className="text-white placeholder-red"
                            value={currentMessage}
                            onChange={e => setCurrentMessage(e.target.value)}
                            placeholder="Wpisz..."
                        />
                        <Button
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Odpowiedz
                        </Button>
                    </div>

            <Card className="px-14 py-6 my-4">

                <CardContent>
                    
                </CardContent>
            </Card>
        </div>
    );
}