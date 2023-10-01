import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';


export default function Textbox(
    {currentMessage, handleSubmit, setCurrentMessage}: 
    {currentMessage: string, handleSubmit: any, setCurrentMessage: any}) : any {
        
    return (
        <div className='flex mt-1 gap-2'>
                <Input
                    className="placeholder-red px-7 h-14"
                    value={currentMessage}
                    onChange={e => setCurrentMessage(e.currentTarget.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                    placeholder="Wpisz..."
                />
                <Button
                    className="grow w-40 h-14"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Odpowiedz
                </Button>
        </div>
    );
}