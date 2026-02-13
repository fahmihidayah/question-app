'use server'

import { getPayload } from 'payload'
import { QuestionFormSchema, ConferenceFormSchema } from '../type'
import config from '@payload-config'
import { QueryAction } from '@/types/query-action'
import { revalidateTag } from 'next/cache'
import { Conference } from '@/payload-types'
import { getMeUser } from '@/utilities/getMeUser'
// import { getMeUserServer } from "@/utilities/getMeUserServer";

export const findByIdConferences = async (slug: string) => {
  const payload = await getPayload({ config })

  const user = await getMeUser()

  // Cari konferensi berdasarkan slug
  const conferenceResult = await payload.find({
    collection: 'conferences',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
      ],
    },
    limit: 1,
  })

  if (conferenceResult.docs.length === 0) {
    return null
  }

  const conference = conferenceResult.docs[0]

  // Cari semua pertanyaan untuk konferensi ini
  const questionsResult = await payload.find({
    collection: 'questions',
    where: {
      conference: {
        equals: conference.id,
      },
    },
    sort: 'createdAt', // yang paling lama dulu
    limit: 1000,
  })

  return {
    conference,
    questions: questionsResult.docs,
  }
}

export const findAllConferences = async () => {
  const payload = await getPayload({ config })
  const user = await getMeUser()
  if (!user.user) return
  return payload.find({
    collection: 'conferences',
    where: {
      user: {
        equals: user.user.id,
      },
    },
  })
}

export const getConferenceById = async (id: string): Promise<Conference | undefined> => {
  const payload = await getPayload({
    config,
  })

  return await payload.findByID({
    collection: 'conferences',
    id: id,
  })
}

export const getConferenceBySlug = async (slug: string): Promise<Conference | undefined> => {
  const payload = await getPayload({
    config,
  })

  const conferenceDocs = await payload.find({
    collection: 'conferences',
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  if (conferenceDocs && conferenceDocs.docs.length > 0) {
    return conferenceDocs.docs[0]
  }
}

export const getConferences = async (queryAction: QueryAction) => {
  const payload = await getPayload({ config })
  const user = await getMeUser()
  if (!user.user) return

  const limit = 10
  const page = queryAction.page || 1

  // Build the where clause
  const whereConditions: any[] = [
    {
      user: {
        equals: user.user.id,
      },
    },
  ]

  // Add keyword search if provided
  if (queryAction.keyword && queryAction.keyword.trim() !== '') {
    whereConditions.push({
      or: [
        {
          title: {
            contains: queryAction.keyword,
          },
        },
        {
          description: {
            contains: queryAction.keyword,
          },
        },
      ],
    })
  }

  return payload.find({
    collection: 'conferences',
    where: {
      and: whereConditions,
    },
    limit,
    page,
    sort: '-createdAt',
  })
}

export const deleteConference = async (slug: string) => {
  const payload = await getPayload({ config })

  const deleted = await payload.delete({
    collection: 'conferences',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return deleted
}

export const deleteConferenceById = async (id: number) => {
  const payload = await getPayload({ config })

  try {
    // Pertama cari dan hapus semua pertanyaan terkait
    await payload.delete({
      collection: 'questions',
      where: {
        conference: {
          equals: id,
        },
      },
    })

    // Kemudian hapus konferensi
    const deleted = await payload.delete({
      collection: 'conferences',
      id: id,
    })

    return deleted
  } catch (error) {
    console.error('Kesalahan menghapus konferensi:', error)
    throw new Error(
      `Gagal menghapus konferensi: ${error instanceof Error ? error.message : 'Kesalahan tidak diketahui'}`,
    )
  }
}

export const creatConference = async (questionFormSchema: QuestionFormSchema) => {
  const payload = await getPayload({ config })

  const slug = questionFormSchema.title.toLowerCase().split(' ').join('-')

  const question = await payload.create({
    collection: 'conferences',
    data: {
      slug: slug,
      ...questionFormSchema,
    },
  })

  return question
}

export const createConferenceAction = async (conferenceForm: ConferenceFormSchema) => {
  const payload = await getPayload({ config })

  const user = await getMeUser()

  if (user.user) {
    const slug = conferenceForm.title.toLowerCase().split(' ').join('-')

    const conference = await payload.create({
      collection: 'conferences',
      data: {
        slug: slug,
        title: conferenceForm.title,
        description: conferenceForm.description,
        user: user.user,
      },
    })

    revalidateTag('/dashboard/conferences', 'max')

    return conference
  }
}
