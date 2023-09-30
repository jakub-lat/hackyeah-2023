import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Uni from "@/components/icons/uni";
import { useTheme } from "@/components/theme-provider";
import { ChevronRight } from "lucide-react";
import { HTMLProps } from "react";

const UniCard = ({ header, city, major, icon, onClick }: {
    header: string,
    city: string,
    major: string,
    icon?: string,
    onClick?: () => void
} & HTMLProps<HTMLButtonElement>) => {
    const { theme } = useTheme()

    return (
        <Card className="flex items-center cursor-pointer hover:opacity-70 transition-all" onClick={onClick}>
            <CardHeader className="p-5">
                <div className="flex gap-4 items-center">
                    <div className={`w-8 h-8 custom-icon-${theme === "dark" ? "light" : "dark"}`}>
                        {icon ? <img src={icon} /> : <Uni />}
                    </div>
                    <div>
                        <CardTitle className="text-lg">{header}</CardTitle>
                        <CardDescription>{city}, kierunek: {major}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardFooter className="p-5 ml-auto">
                <Button variant="ghost"><ChevronRight/></Button>
            </CardFooter>
        </Card>
    )
}

export default UniCard;
