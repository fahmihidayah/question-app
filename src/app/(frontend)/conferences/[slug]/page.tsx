import { getConferenceBySlug } from "@/features/conferences/actions"
import ConferenceDetail from "@/features/conferences/components/detail"
import { getListQuestionByConferenceId } from "@/features/questions/actions"
import { notFound } from "next/navigation"

type Props = {
    params : Promise<{
        slug : string
    }>
    searchParams : Promise<{
        [key : string] : string | string[] | undefined
    }> 
}

export default async function Page(props : Props) {
    const slug = (await props.params).slug;
    const conference = await getConferenceBySlug(slug)
    if(!conference) {
        notFound()
    }
    const questions = await getListQuestionByConferenceId(conference?.id)
    return <ConferenceDetail conference={conference} questions={questions.docs} />
}