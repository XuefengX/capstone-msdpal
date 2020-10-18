import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import {
    validateRequest,
    NotFoundError,
    requireAuth,
    NotAuthorizedError
} from '@xuefengxu/common'
import { Post } from '../models/post'
import { PostUpdatedPublisher } from '../events/publishers/post-update-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.put('/api/posts/:id', requireAuth, [
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
    const post = await Post.findById(req.params.id)
    if (!post) {
        throw new NotFoundError()
    }
    if (post.authorId !== req.currentUser!.id) {
        throw new NotAuthorizedError()
    }
    const {
        title,
        contents,
        category,
        img
    } = req.body
    post.set({
        title: title,
        contents: contents,
        category: category,
        author: req.currentUser!.username,
        authorId: req.currentUser!.id,
        authorEmail: req.currentUser!.email,
        img: img
    })
    await post.save()

    new PostUpdatedPublisher(natsWrapper.client).publish({
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
    // console.log(`new posts: ${post}`)
    res.status(200).send(post)
})

export { router as updateRouter }