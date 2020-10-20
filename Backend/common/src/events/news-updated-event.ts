import { Subjects } from './subjects';

export interface NewsUpdatedEvent {
    subject: Subjects.NewsUpdated;
    data: {
        id: string,
        title: string,
        contents: string,
        category: string,
        img: string,
        version: number
    };
}
