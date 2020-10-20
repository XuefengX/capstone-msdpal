import { Publisher, Subjects, CommentCreatedEvent } from '@xuefengxu/common'

export class CommentCreatedPublisher extends Publisher<CommentCreatedEvent> {
    subject: Subjects.CommentCreated = Subjects.CommentCreated
}