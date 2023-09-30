import {PropsWithChildren} from "react";

export default function FormGroup({children}: PropsWithChildren<{}>) {
    return <div className="flex flex-col space-y-1.5">
        {children}
    </div>
}
