import { Message } from 'node-nats-streaming'
import { Subjects, Listener, PostUpdatedEvent, NotAuthorizedError, NotFoundError } from '@xuefengxu/common'
import { Post } from '../../models/post'
import { queueGroupName } from './queue-group-name'

export class PostUpdatedListener extends Listener<PostUpdatedEvent> {
    subject: Subjects.PostUpdated = Subjects.PostUpdated
    queueGroupName = queueGroupName

    async onMessage(data: PostUpdatedEvent['data'], msg: Message) {
        const {
            id,
            title,
            contents,
            category,
            img,
            author,
            authorId,
            authorEmail,
            version
        } = data

        const post = await Post.findOne({
            _id: id,
            __v: version - 1
        })

        if (!post) {
            throw new Error('Cannot find post')
        }

        post.set({
            title,
            contents,
            category,
            img,
            author,
            authorId,
            authorEmail
        })

        post.date = new Date()
        await post.save()
        console.log(`Query Service save: ${post}`)

        // const postExist = await Post.findById(id)
        // console.log(`In query service database: ${postExist}`)
        msg.ack()
    }
}