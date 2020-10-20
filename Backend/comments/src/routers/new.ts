import express, { Request, Response } from 'express'
import { requireAuth, validateRequest } from '@xuefengxu/common'
import { body } from 'express-validator'
import { Comment } from '../models/comment'
import { CommentCreatedPublisher } from '../events/publishers/comment-created-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.post('/api/comments/:postId', requireAuth, [
    body('contents')
        .not()
        .isEmpty()
        .withMessage('Content is required')
], validateRequest, async (req: Request, res: Response) => {
    const {
        contents,
        img
    } = req.body

    const comment = Comment.build({
        postId: req.params.postId,
        contents: contents,
        author: req.currentUser!.username,
        authorId: req.currentUser!.id,
        authorEmail: req.currentUser!.email,
        img: img
    })

    await comment.save()
    new CommentCreatedPublisher(natsWrapper.client).publish({
        id: comment.id,
        postId: comment.postId,
        contents: comment.contents,
        author: comment.author,
        authorId: comment.authorId,
        authorEmail: comment.authorEmail,
        img: comment.img,
        version: comment.__v!
    })

    res.status(201).send(comment)
})

export { router as createCommentRouter }