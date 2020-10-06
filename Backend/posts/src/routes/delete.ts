import express, { Request, Response } from 'express'
import { Post } from '../models/post'
import {
    requireAuth,
    NotAuthorizedError,
    NotFoundError
} from '@xuefengxu/common'

const router = express.Router()

router.delete('/api/posts/:id', requireAuth, async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id)
    if (!post) {
        throw new NotFoundError()
    }
    if (post.authorId !== req.currentUser!.id) {
        throw new NotAuthorizedError()
    }
    await Post.findByIdAndDelete(req.params.id)
    // if (await Post.findById(req.params.id)) {
    //     console.log(`Unable to delete ${post}`)
    // }
    res.status(200).send({})
})


export { router as deleteRouter }