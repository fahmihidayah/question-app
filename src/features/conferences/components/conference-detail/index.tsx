import { Card } from "@/components/ui/card";
import { QuestionsDataTable } from "@/features/questions/components/questions-data-table";
import { Conference } from "@/payload-types";

export default function DashboardConferenceDetail({
    conference
}: { conference: Conference }) {
    return <div className="w-full flex flex-col ">
        <Card className="p-6 mb-6">
            <div className="space-y-4">
                {/* Conference Title */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {conference.title}
                    </h2>
                    {conference.slug && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Slug: {conference.slug}
                        </p>
                    )}
                </div>

                {/* Conference Description */}
                {conference.description && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Description
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {conference.description}
                        </p>
                    </div>
                )}

                {/* Conference Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {conference.createdAt && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                Created At
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {new Date(conference.createdAt).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    )}
                    {conference.updatedAt && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                Last Updated
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {new Date(conference.updatedAt).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
        <QuestionsDataTable conferenceId={`${conference.id}`} isTableQuestion={false} />
    </div>
}