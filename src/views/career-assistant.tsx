import PageLayout from "@/layouts/PageLayout.tsx";
// import {Button} from "@/components/ui/button.tsx";
// import {ArrowLeft} from "lucide-react";
// import {Link} from "react-router-dom";
import Chatbot from "@/components/chatbot";

export default function CareerAssistant() {
    return <PageLayout>
        {/*<PageTitle className={'flex items-center mt-6'}>*/}
        {/*    <Button variant={'ghost'} size={'sm'} className={'mr-2'} asChild>*/}
        {/*        <Link to={'/fields-of-study'}>*/}
        {/*            <ArrowLeft />*/}
        {/*        </Link>*/}
        {/*    </Button>*/}
        {/*    Asystent*/}
        {/*</PageTitle>*/}
        <Chatbot/>
    </PageLayout>
}