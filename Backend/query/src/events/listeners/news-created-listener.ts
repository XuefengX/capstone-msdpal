import { Message } from 'node-nats-streaming'
import { Subjects, Listener, NewsCreatedEvent } from '@xuefengxu/common'
import { News } from '../../models/news'
import { queueGroupName } from './queue-group-name'

export class NewsCreatedListener extends Listener<NewsCreatedEvent> {
    subject: Subjects.NewsCreated = Subjects.NewsCreated
    queueGroupName = queueGroupName

    async onMessage(data: NewsCreatedEvent['data'], msg: Message) {
        const {
            id,
            title,
            contents,
            category,
            img,
            version
        } = data
        const news = News.build({
            title,
            contents,
            category,
            img
        })
        news._id = id
        news.date = new Date()
        await news.save()
        console.log(`Query Service saved: ${news}`)

        // const postExist = await Post.findById(id)
        // console.log(`In query service database: ${postExist}`)
        msg.ack()
    }
}