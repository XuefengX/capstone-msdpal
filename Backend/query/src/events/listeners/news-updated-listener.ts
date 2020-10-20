import { Message } from 'node-nats-streaming'
import { Subjects, Listener, NewsUpdatedEvent } from '@xuefengxu/common'
import { News } from '../../models/news'
import { queueGroupName } from './queue-group-name'

export class NewsUpdatedListener extends Listener<NewsUpdatedEvent> {
    subject: Subjects.NewsUpdated = Subjects.NewsUpdated
    queueGroupName = queueGroupName

    async onMessage(data: NewsUpdatedEvent['data'], msg: Message) {
        const {
            id,
            title,
            contents,
            category,
            img,
            version
        } = data

        const news = await News.findOne({
            _id: id,
            __v: version - 1
        })

        if (!news) {
            throw new Error('Cannot find news')
        }

        news.set({
            title,
            contents,
            category,
            img
        })
        await news.save()
        console.log(`Query Service save: ${news}`)

        // const newsExist = await News.findById(id)
        // console.log(`In query service database: ${newsExist}`)
        msg.ack()
    }
}