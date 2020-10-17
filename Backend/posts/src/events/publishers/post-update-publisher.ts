import { Publisher, Subjects, PostUpdatedEvent } from '@xuefengxu/common'

export class PostUpdatedPublisher extends Publisher<PostUpdatedEvent> {
    subject: Subjects.PostUpdated = Subjects.PostUpdated
}