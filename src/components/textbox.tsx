import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';


export default function Textbox(
    {currentMessage, handleSubmit, setCurrentMessage}: 
    {currentMessage: string, handleSubmit: any, setCurrentMessage: any}) : any {
        
    return (
        <div className='flex mt-1 gap-2'>
                <Input
                    className="text-white placeholder-red px-12"
                    value={currentMessage}
                    onChange={e => setCurrentMessage(e.currentTarget.value)}
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
    );
}