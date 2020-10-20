import { Subjects } from './subjects';

export interface NewsCreatedEvent {
    subject: Subjects.NewsCreated;
    data: {
        id: string,
        title: string,
        contents: string,
        category: string,
        img: string,
        version: number
    };
}
