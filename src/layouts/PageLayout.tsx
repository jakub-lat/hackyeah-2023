import {PropsWithChildren} from "react";
import {cn} from "@/lib/utils.ts";

export default function PageLayout({children}: PropsWithChildren<{}>) {
    return <div className={"px-10 py-10"}>
        {children}
    </div>
}

export function PageTitle({className, children}: PropsWithChildren<{ className?: string }>) {
    return <h1 className={cn("text-2xl font-bold", className)}>{children}</h1>
}