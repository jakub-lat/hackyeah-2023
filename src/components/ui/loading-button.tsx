import {Button} from "@/components/ui/button.tsx";
import {ComponentProps} from "react";
import {cn} from "@/lib/utils.ts";
import {Loader} from "lucide-react";

export default function LoadingButton({isLoading, children, className, ...props}: ComponentProps<typeof Button> & {isLoading?: boolean}) {
    return <Button className={cn("relative", className)} {...props}>
        <div className={cn("inline-flex items-center justify-center", {"opacity-0": isLoading})}>
            {children}
        </div>
        <div className={cn("absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center", {"hidden": !isLoading})}>
            <Loader className={"h-4 w-4 animate-spin"} />
        </div>
    </Button>
}