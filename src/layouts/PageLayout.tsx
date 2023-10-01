import {PropsWithChildren} from "react";
import {cn} from "@/lib/utils.ts";

export default function PageLayout({children, className}: PropsWithChildren<{className?: string}>) {
    return <div className={cn("px-10 py-2 flex-1 flex flex-col", className)}>
        {children}
    </div>
}

export function PageTitle({className, children}: PropsWithChildren<{ className?: string }>) {
    return <h1 className={cn("text-xl font-bold ", className)}>{children}</h1>
}