import { Message } from 'node-nats-streaming'
import { Subjects, Listener, NewsDeletedEvent } from '@xuefengxu/common'
import { News } from '../../models/news'
import { queueGroupName } from './queue-group-name'

export class NewsDeletedListener extends Listener<NewsDeletedEvent> {
    subject: Subjects.NewsDeleted = Subjects.NewsDeleted
    queueGroupName = queueGroupName

    async onMessage(data: NewsDeletedEvent['data'], msg: Message) {
        const { id, version } = data

        const news = await News.findById(id)
        if (!news) {
            throw new Error('Cannot find news')
        }

        await News.findByIdAndDelete(id)
        console.log(`Query Service delete: ${news._id} in version ${news.__v}`)

        // const newsExist = await News.findById(id)
        // console.log(`In query service database: ${newsExist}`)
        msg.ack()
    }
}