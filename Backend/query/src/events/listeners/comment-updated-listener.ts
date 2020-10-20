import { Message } from 'node-nats-streaming'
import { Subjects, Listener, CommentUpdatedEvent } from '@xuefengxu/common'
import { Comment } from '../../models/comment'
import { queueGroupName } from './queue-group-name'

export class CommentUpdatedListener extends Listener<CommentUpdatedEvent> {
    subject: Subjects.CommentUpdated = Subjects.CommentUpdated
    queueGroupName = queueGroupName

    async onMessage(data: CommentUpdatedEvent['data'], msg: Message) {
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

        const comment = await Comment.findOne({
            _id: id,
            __v: version - 1
        })

        if (!comment) {
            throw new Error('Cannot find comment')
        }

        comment.set({
            postId,
            contents,
            img,
            author,
            authorId,
            authorEmail
        })
        await comment.save()
        console.log(`Query Service save: ${comment}`)

        // const commentExist = await Comment.findById(id)
        // console.log(`In query service database: ${commentExist}`)
        msg.ack()
    }
}