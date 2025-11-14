import { getConferenceBySlug } from "@/features/conferences/actions"
import QuestionForm from "@/features/questions/components/form";
import { getMeUser } from "@/utilities/getMeUser";
// import { getMeUserServer } from "@/utilities/getMeUserServer";
import { notFound, redirect } from "next/navigation";

type Props = {
    params : Promise<{
        slug : string
    }>
}
export default async function Page({params} : Props) {
    const slug = (await params).slug

    const user = await getMeUser()
    console.log("user ", user)
    if(!user.user) {
        redirect(`/sign-in?redirect=/conferences/${slug}/questions`)
    }

    const conferences = await getConferenceBySlug(
        slug
    );

    if(!conferences) {
        notFound();
    }
    
    return <QuestionForm user={user.user} conferenceSlug={conferences?.slug!!} conferenceName={conferences?.title} />
}