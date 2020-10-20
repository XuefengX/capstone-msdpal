import { Subjects } from './subjects';

export interface CommentCreatedEvent {
    subject: Subjects.CommentCreated;
    data: {
        id: string,
        postId: string,
        contents: string,
        author: string,
        authorId: string,
        authorEmail: string,
        img: string,
        version: number
    };
}
