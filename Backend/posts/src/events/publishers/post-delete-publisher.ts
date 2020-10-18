import { Publisher, Subjects, PostDeletedEvent } from '@xuefengxu/common'

export class PostDeletedPublisher extends Publisher<PostDeletedEvent> {
    subject: Subjects.PostDeleted = Subjects.PostDeleted
}