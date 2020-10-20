import { Publisher, Subjects, NewsDeletedEvent } from '@xuefengxu/common'

export class NewsDeletedPublisher extends Publisher<NewsDeletedEvent> {
    subject: Subjects.NewsDeleted = Subjects.NewsDeleted
}