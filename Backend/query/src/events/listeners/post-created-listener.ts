import { Message } from 'node-nats-streaming'
import { Subjects, Listener, PostCreatedEvent } from '@xuefengxu/common'
import { Post } from '../../models/post'
import { queueGroupName } from './queue-group-name'

export class PostCreatedListener extends Listener<PostCreatedEvent> {
    subject: Subjects.PostCreated = Subjects.PostCreated
    queueGroupName = queueGroupName

    async onMessage(data: PostCreatedEvent['data'], msg: Message) {
        const {
            id,
            title,
            contents,
            category,
            img,
            author,
            authorId,
            authorEmail
        } = data
        const post = Post.build({
            title,
            contents,
            category,
            img,
            author,
            authorId,
            authorEmail
        })
        post._id = id
        await post.save()
        console.log(`Query Service save: ${post}`)

        const postExist = await Post.findById(id)
        console.log(`In query service database: ${postExist}`)
        msg.ack()
    }
}