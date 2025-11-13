'use server';
import config from "@payload-config";
import { getPayload } from "payload";
import { QuestionFormSchema } from "../type";
import { equal } from "assert";
import { sendEvent } from "@/utilities/pusher/pusher-server";
import { getMeUser } from "@/utilities/getMeUser";
import { QueryAction } from "@/types/query-action";


export const getListQuestionByConferenceId = async (id?: number) => {
    const payload = await getPayload({ config })

    const questions = await payload.find({
        collection: "questions",
        where: {
            and: [
                {
                    conference: {
                        equals: id
                    }
                },
                {
                    accept : {
                        equals: true
                    }
                }
            ]
        }
    })

    return questions;
}
export const createQuestion = async (form: FormData) => {
    const payload = await getPayload({ config });
    const user = await getMeUser();
    if (user) {
        const name = form.get("name") as string;
        const question = form.get('question') as string;
        const conferencesSlug = form.get("slug") as string;
        const conferenceResult = await payload.find({
            collection: "conferences",
            where: {
                slug: {
                    equals: conferencesSlug
                }
            }
        });

        const conference = conferenceResult.docs[0];

        const questionResult = await payload.create({
            collection: "questions",
            data: {
                conference: conference.id,
                name: name,
                question: question,
                user: user.user
            }
        });

        return questionResult;
    }


}

export const createQuestionAction = async (questionData: QuestionFormSchema) => {
    const payload = await getPayload({ config });
    const user = await getMeUser();
    if (user) {
        // Cari konferensi berdasarkan slug
        const conferenceResult = await payload.find({
            collection: "conferences",
            where: {
                slug: {
                    equals: questionData.conference
                }
            }
        });

        if (conferenceResult.docs.length === 0) {
            throw new Error("Konferensi tidak ditemukan");
        }

        const conference = conferenceResult.docs[0];

        // Buat pertanyaan
        const questionResult = await payload.create({
            collection: "questions",
            data: {
                conference: conference.id,
                name: questionData.name,
                question: questionData.question,
                user: user.user
            }
        });


        const event = await sendEvent(questionData.conference)
        console.log("event is ", event)
        return questionResult;
    }

}

export const deleteQuestion = async (questionId: number) => {
    const payload = await getPayload({ config });

    try {
        const result = await payload.delete({
            collection: "questions",
            id: questionId.toString()
        });

        return { success: true, data: result };
    } catch (error) {
        console.error("Error deleting question:", error);
        return { success: false, error: "Failed to delete question" };
    }
}

export const getQuestions = async (queryAction: QueryAction = {}) => {
    const payload = await getPayload({ config });
    const user = await getMeUser();

    const limit = 10;
    const page = queryAction.page || 1;

    // Build the where clause
    const whereConditions: any[] = [];

    // Add keyword search if provided
    if (queryAction.keyword && queryAction.keyword.trim() !== '') {
        whereConditions.push({
            or: [
                {
                    question: {
                        contains: queryAction.keyword
                    }
                },
                {
                    name: {
                        contains: queryAction.keyword
                    }
                }
            ]
        });
    }

    return payload.find({
        collection: "questions",
        where: whereConditions.length > 0 ? {
            and: whereConditions
        } : {},
        limit,
        page,
        sort: '-createdAt'
    });
}