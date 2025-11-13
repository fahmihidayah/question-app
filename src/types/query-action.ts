export type QueryAction = {
    keyword?: string
    page?: number
}

export type QuestionQueryAction =  QueryAction & {
    conferenceId : string
}