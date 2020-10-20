import { Message } from 'node-nats-streaming'
import { Subjects, Listener, PostDeletedEvent, NotAuthorizedError, NotFoundError } from '@xuefengxu/common'
import { Post } from '../../models/post'
import { queueGroupName } from './queue-group-name'

export class PostDeletedListener extends Listener<PostDeletedEvent> {
    subject: Subjects.PostDeleted = Subjects.PostDeleted
    queueGroupName = queueGroupName

    async onMessage(data: PostDeletedEvent['data'], msg: Message) {
        const { id, version } = data

        const post = await Post.findOne({
            _id: id,
            __v: version - 1
        })
        if (!post) {
            throw new Error('Cannot find post')
        }

        await Post.findByIdAndDelete(id)
        console.log(`Query Service delete: ${post._id} in version ${post.__v}`)

        // const postExist = await Post.findById(id)
        // console.log(`In query service database: ${postExist}`)
        msg.ack()
    }
}