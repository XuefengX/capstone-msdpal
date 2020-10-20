import { Publisher, Subjects, NewsCreatedEvent } from '@xuefengxu/common'

export class NewsCreatedPublisher extends Publisher<NewsCreatedEvent> {
    subject: Subjects.NewsCreated = Subjects.NewsCreated
}