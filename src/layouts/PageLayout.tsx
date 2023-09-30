import {PropsWithChildren} from "react";
import {cn} from "@/lib/utils.ts";

export default function PageLayout({children}: PropsWithChildren<{}>) {
    return <div className={"px-10 py-10 flex-1 flex flex-col"}>
        {children}
    </div>
}

export function PageTitle({className, children}: PropsWithChildren<{ className?: string }>) {
    return <h1 className={cn("text-2xl font-bold font-radio-canada", className)}>{children}</h1>
}