import { getConferenceBySlug } from "@/features/conferences/actions"
import QuestionForm from "@/features/questions/components/form";
import { notFound } from "next/navigation";

type Props = {
    params : Promise<{
        slug : string
    }>
}
export default async function Page({params} : Props) {
    const conferences = await getConferenceBySlug(
        (await params).slug
    );

    if(!conferences) {
        notFound();
    }
    
    return <QuestionForm conferenceSlug={conferences?.slug!!} conferenceName={conferences?.title} />
}