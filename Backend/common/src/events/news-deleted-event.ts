import { Subjects } from './subjects'

export interface NewsDeletedEvent {
    subject: Subjects.NewsDeleted
    data: {
        id: string,
        version: number
    }
}