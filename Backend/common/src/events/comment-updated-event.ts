import { Subjects } from './subjects';

export interface CommentUpdatedEvent {
    subject: Subjects.CommentUpdated;
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