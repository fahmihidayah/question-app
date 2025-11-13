import { getConferenceBySlug, getConferenceById } from "@/features/conferences/actions"
import DashboardConferenceDetail from "@/features/conferences/components/conference-detail"
import { notFound } from "next/navigation"

type Props = {
    params : Promise<{
        id : string
    }>
}

export default async function ConferenceDetailPage({params} : Props) {
    const id = (await params).id
    const conference = await getConferenceById(id)
    if(!conference) {
        notFound();
    }
    return <DashboardConferenceDetail conference={conference} />
}