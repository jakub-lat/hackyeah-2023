import {useFilterStore} from "@/store/filterStore.ts";
import {Button} from "@/components/ui/button.tsx";

export default function Home() {
    const { count, increment } = useFilterStore();
    return <div className={"p-10"}>
        {count}
        <br />
        <Button onClick={() => increment()}>Increment</Button>
    </div>
}