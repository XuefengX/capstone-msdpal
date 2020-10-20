import { Publisher, Subjects, NewsUpdatedEvent } from '@xuefengxu/common'

export class NewsUpdatedPublisher extends Publisher<NewsUpdatedEvent> {
    subject: Subjects.NewsUpdated = Subjects.NewsUpdated
}