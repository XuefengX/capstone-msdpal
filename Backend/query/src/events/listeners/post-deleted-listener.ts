import { Message } from 'node-nats-streaming'
import { Subjects, Listener, PostDeletedEvent, NotAuthorizedError, NotFoundError } from '@xuefengxu/common'
import { Post } from '../../models/post'
import { queueGroupName } from './queue-group-name'

export class PostDeletedListener extends Listener<PostDeletedEvent> {
    subject: Subjects.PostDeleted = Subjects.PostDeleted
    queueGroupName = queueGroupName

    async onMessage(data: PostDeletedEvent['data'], msg: Message) {
        const { id } = data

        const post = await Post.findById(id)
        if (!post) {
            throw new NotFoundError()
        }

        await Post.findByIdAndDelete(id)
        console.log(`Query Service save: ${post}`)

        // const postExist = await Post.findById(id)
        // console.log(`In query service database: ${postExist}`)
        msg.ack()
    }
}