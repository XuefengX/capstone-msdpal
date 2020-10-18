import { Subjects } from './subjects';

export interface PostUpdatedEvent {
  subject: Subjects.PostUpdated;
  data: {
    id: string,
    title: string,
    contents: string,
    category: string,
    author: string,
    authorId: string,
    authorEmail: string,
    img: string,
    version: number
  };
}
