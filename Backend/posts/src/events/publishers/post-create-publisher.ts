import { Publisher, Subjects, PostCreatedEvent } from '@xuefengxu/common'

export class PostCreatedPublisher extends Publisher<PostCreatedEvent> {
    subject: Subjects.PostCreated = Subjects.PostCreated
}