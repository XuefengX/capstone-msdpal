import express, { Request, Response } from 'express'
import { Comment } from '../models/comment'
import {
    requireAuth,
    NotAuthorizedError,
    NotFoundError
} from '@xuefengxu/common'
import { CommentDeletedPublisher } from '../events/publishers/comment-deleted-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.delete('/api/comments/:postId/:id', requireAuth, async (req: Request, res: Response) => {
    const comment = await Comment.findById(req.params.id)
    if (!comment) {
        throw new NotFoundError()
    }
    if (comment.authorId !== req.currentUser!.id) {
        throw new NotAuthorizedError()
    }
    await Comment.findByIdAndDelete(req.params.id)
    // if (await Post.findById(req.params.id)) {
    //     console.log(`Unable to delete ${post}`)
    // }
    new CommentDeletedPublisher(natsWrapper.client).publish({
        id: req.params.id,
        version: comment.__v!
    })
    res.status(200).send({})
})


export { router as deleteCommentRouter }