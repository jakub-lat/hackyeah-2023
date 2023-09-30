import PageLayout, {PageTitle} from "@/layouts/PageLayout.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft} from "lucide-react";
import {Link} from "react-router-dom";
import Chatbot from "@/components/chatbot";

export default function CareerAssistant() {
    return <PageLayout>
        <PageTitle className={'flex items-center'}>
            <Button variant={'ghost'} size={'sm'} className={'mr-2'} asChild>
                <Link to={'/fields-of-study'}>
                    <ArrowLeft />
                </Link>
            </Button>
            Asystent kierunków
        </PageTitle>
        <Chatbot />
    </PageLayout>
}