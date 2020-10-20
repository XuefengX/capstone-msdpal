import { Publisher, Subjects, CommentUpdatedEvent } from '@xuefengxu/common'

export class CommentUpdatedPublisher extends Publisher<CommentUpdatedEvent> {
    subject: Subjects.CommentUpdated = Subjects.CommentUpdated
}