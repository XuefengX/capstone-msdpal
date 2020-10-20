import { Message } from 'node-nats-streaming'
import { Subjects, Listener, CommentDeletedEvent } from '@xuefengxu/common'
import { Comment } from '../../models/comment'
import { queueGroupName } from './queue-group-name'

export class CommentDeletedListener extends Listener<CommentDeletedEvent> {
    subject: Subjects.CommentDeleted = Subjects.CommentDeleted
    queueGroupName = queueGroupName

    async onMessage(data: CommentDeletedEvent['data'], msg: Message) {
        const { id, version } = data

        const comment = await Comment.findById(id)

        if (!comment) {
            throw new Error('Cannot find comment')
        }

        await Comment.findByIdAndDelete(id)
        console.log(`Query Service delete: ${comment._id} in version ${comment.__v}`)
        msg.ack()
    }
}