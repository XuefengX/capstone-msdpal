import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import {
    validateRequest,
    NotFoundError,
    requireAuth,
    NotAuthorizedError
} from '@xuefengxu/common'
import { Comment } from '../models/comment'
import { CommentUpdatedPublisher } from '../events/publishers/comment-updated-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.put('/api/comments/:postId/:id', requireAuth, [
    body('contents')
        .not()
        .isEmpty()
        .withMessage('Content is required')
], validateRequest, async (req: Request, res: Response) => {
    const comment = await Comment.findById(req.params.id)
    if (!comment) {
        throw new NotFoundError()
    }
    if (comment.authorId !== req.currentUser!.id) {
        throw new NotAuthorizedError()
    }
    const {
        contents,
        img
    } = req.body
    comment.set({
        postId: req.params.postId,
        contents: contents,
        author: req.currentUser!.username,
        authorId: req.currentUser!.id,
        authorEmail: req.currentUser!.email,
        img: img
    })
    await comment.save()

    new CommentUpdatedPublisher(natsWrapper.client).publish({
        id: comment.id,
        postId: comment.postId,
        contents: comment.contents,
        author: comment.author,
        authorId: comment.authorId,
        authorEmail: comment.authorEmail,
        img: comment.img,
        version: comment.__v!
    })
    // console.log(`new posts: ${post}`)
    res.status(200).send(comment)
})

export { router as updateCommentRouter }