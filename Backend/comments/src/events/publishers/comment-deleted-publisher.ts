import { Publisher, Subjects, CommentDeletedEvent } from '@xuefengxu/common'

export class CommentDeletedPublisher extends Publisher<CommentDeletedEvent> {
    subject: Subjects.CommentDeleted = Subjects.CommentDeleted
}