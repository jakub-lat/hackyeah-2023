import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button.tsx";
import { PropsWithChildren, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { TabsInput, TabsInputItem } from "@/components/tabs-input.tsx";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "@/lib/firebase.ts";
import { doc, getDoc, setDoc } from "@firebase/firestore";

function FormGroup({ children }: PropsWithChildren<{}>) {
    return <div className="flex flex-col space-y-1.5">
        {children}
    </div>

}

export default function BasicInfo() {
    const [category, setCategory] = useState<string>('undergraduate');
    const [userOrigin, setUserOrigin] = useState<string>('poland');
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.currentUser)
            return;

        const userRef = doc(firestore, 'users', auth.currentUser.uid);

        getDoc(userRef).then((doc) => {
            if (!doc.exists()) {
                setDoc(userRef, {
                    category: category,
                    userOrigin: userOrigin
                })
            }
            else {
                setCategory(doc.data().category);
                setUserOrigin(doc.data().userOrigin);
            }
        })
    }, [auth.currentUser])

    const next = () => {
        setDoc(doc(firestore, 'users', auth.currentUser.uid), {
            category: category,
            userOrigin: userOrigin
        }, { merge: true }).then(() => {
            navigate('/assistant');
        })
    }

    return <div className={"flex justify-center items-center mt-20"}>
        <Card className="w-[600px]">
            <CardHeader>
                <CardTitle>Zaczynamy!</CardTitle>
                <CardDescription>Powiedz nam kilka słów o sobie.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-10">
                        <FormGroup>
                            <Label className={"mb-1"}>Czego szukasz?</Label>
                            <TabsInput value={category} onValueChange={setCategory}>
                                <TabsInputItem value={"undergraduate"}>Studia I stopnia</TabsInputItem>
                                <TabsInputItem value={"masters"}>Studia II stopnia</TabsInputItem>
                                <TabsInputItem value={"postgraduate"}>Studia III stopnia</TabsInputItem>
                            </TabsInput>
                        </FormGroup>
                        <FormGroup>
                            <Label className={"mb-1"}>Skąd jesteś?</Label>
                            <TabsInput value={userOrigin} onValueChange={setUserOrigin}>
                                <TabsInputItem value={"poland"}>Polska</TabsInputItem>
                                <TabsInputItem value={"foreign"}>Zagranica</TabsInputItem>
                            </TabsInput>
                        </FormGroup>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-end pt-8">
                <Button onClick={next}>
                    Kontynuuj
                    <ArrowRight className={"h-4 w-4 ml-2"} />
                </Button>
            </CardFooter>
        </Card>
    </div>
}