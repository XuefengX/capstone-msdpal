import { Message } from 'node-nats-streaming'
import { Subjects, Listener, CommentCreatedEvent } from '@xuefengxu/common'
import { Comment } from '../../models/comment'
import { queueGroupName } from './queue-group-name'

export class CommentCreatedListener extends Listener<CommentCreatedEvent> {
    subject: Subjects.CommentCreated = Subjects.CommentCreated
    queueGroupName = queueGroupName

    async onMessage(data: CommentCreatedEvent['data'], msg: Message) {
        const {
            id,
            postId,
            contents,
            img,
            author,
            authorId,
            authorEmail,
            version
        } = data
        const comment = Comment.build({
            postId,
            contents,
            img,
            author,
            authorId,
            authorEmail
        })
        comment._id = id
        comment.date = new Date()
        await comment.save()
        console.log(`Query Service save: ${comment}`)

        // const postExist = await Post.findById(id)
        // console.log(`In query service database: ${postExist}`)
        msg.ack()
    }
}