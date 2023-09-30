import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, School2 } from "lucide-react";
import { HTMLProps } from "react";

const UniCard = ({ header, description, icon, onClick }: {
    header: string,
    description: string,
    icon?: string,
    onClick?: () => void
} & HTMLProps<HTMLButtonElement>) => {
    return (
        <Card className="flex items-center cursor-pointer opacity-70 hover:opacity-100 transition-all" onClick={onClick}>
            <CardHeader className="p-5">
                <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 icon">
                        {icon ?
                            <img src={icon} /> :
                            <School2 className="w-full h-full" color={"#478ce6"} />
                        }
                    </div>
                    <div>
                        <CardTitle className="text-lg">{header}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardFooter className="p-5 ml-auto">
                <Button variant="ghost"><ChevronRight /></Button>
            </CardFooter>
        </Card>
    )
}

export default UniCard;
