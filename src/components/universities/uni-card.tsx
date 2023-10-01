import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, School2 } from "lucide-react";
import {HTMLProps, MouseEvent} from "react";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid"
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline"
import { useState } from "react";

const UniCard = ({ header, description, icon, onClick: onClick }: {
    header: string,
    description: string,
    icon?: string,
    onClick?: () => void
} & HTMLProps<HTMLButtonElement>) => {

    const [isFavorited, setIsFavorited] = useState<boolean>(false);

    function handleClick() {
        if (onClick) {
            onClick();
        }
    }

    function toggleFav(e: MouseEvent) {
        e.stopPropagation();
        setIsFavorited(x => x = !x);
    }

    return (
        <Card className="flex items-center cursor-pointer opacity-70 hover:opacity-100 transition-all" onClick={handleClick}>
            <CardHeader className="p-5">
                <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 icon">
                        {icon ?
                            <img src={icon} /> :
                            <School2 className="w-full h-full" color={"#478ce6"} />
                        }
                    </div>
                    <div className="flex-1">
                        <CardTitle className="text-lg">{header}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardFooter className="p-5 ml-auto">
                <Button onClick={toggleFav} variant="ghost">
                    { isFavorited ? <HeartSolid className="h-5 w-5" /> : <HeartOutline className="h-5 w-5" />}
                    </Button>
                <Button variant="ghost" onClick={handleClick}><ChevronRight /></Button>
            </CardFooter>
        </Card>
    )
}

export default UniCard;
