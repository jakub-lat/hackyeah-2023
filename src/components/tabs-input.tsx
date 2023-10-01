import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {ComponentProps} from "react";

export function TabsInput({children, ...props}: ComponentProps<typeof Tabs>) {
    return (
        <Tabs defaultValue="account" {...props}>
            <TabsList className="grid w-full auto-cols-fr grid-flow-col">
                {children}
            </TabsList>
        </Tabs>
    );
}

export function TabsInputItem({children, ...props}: ComponentProps<typeof TabsTrigger>) {
    return <TabsTrigger {...props}>{children}</TabsTrigger>;
}