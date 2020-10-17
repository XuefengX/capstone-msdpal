import { Subjects } from './subjects';

export interface PostCreatedEvent {
  subject: Subjects.PostCreated;
  data: {
    id: string,
    title: string,
    contents: string,
    category: string,
    author: string,
    authorId: string,
    authorEmail: string,
    img: string
  };
}
