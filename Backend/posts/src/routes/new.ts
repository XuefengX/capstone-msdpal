import express, { Request, Response } from 'express'
import { requireAuth, validateRequest } from '@xuefengxu/common'
import { body } from 'express-validator'
import { Post } from '../models/post'
import { PostCreatedPublisher } from '../events/publishers/post-create-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.post('/api/posts', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    body('contents')
        .not()
        .isEmpty()
        .withMessage('Content is required'),
    body('category')
        .not()
        .isEmpty()
        .withMessage('Category is required')
], validateRequest, async (req: Request, res: Response) => {
    const {
        title,
        contents,
        category,
        img
    } = req.body

    const post = Post.build({
        title: title,
        contents: contents,
        category: category,
        author: req.currentUser!.username,
        authorId: req.currentUser!.id,
        authorEmail: req.currentUser!.email,
        img: img
    })

    await post.save()
    new PostCreatedPublisher(natsWrapper.client).publish({
        id: post.id,
        title: post.title,
        category: post.category,
        contents: post.contents,
        author: post.author,
        authorId: post.authorId,
        authorEmail: post.authorEmail,
        img: post.img,
        version: post.__v!
    })

    res.status(201).send(post)
})

export { router as createPostsRouter }