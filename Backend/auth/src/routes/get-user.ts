import express, { Request, Response } from 'express'
import { User } from '../models/user'
import { currentUser, requireAuth, BadRequestError } from '@xuefengxu/common'
import { param } from 'express-validator'

const router = express.Router()

router.get('/api/users/username/:username', currentUser, requireAuth, async (req: Request, res: Response) => {
    const existedUser = await User.findOne({ username: req.params.username })
    // console.log(existedUser)
    if (!existedUser) {
        throw new BadRequestError(`Cannot find user: ${req.params.username}`)
    }
    res.status(200).send(existedUser)
})

router.get('/api/users/email/:email', currentUser, requireAuth, async (req: Request, res: Response) => {
    const existedUser = await User.findOne({ email: req.params.email })
    if (!existedUser) {
        throw new BadRequestError(`Cannot find user: ${req.params.email}`)
    }
    res.status(200).send(existedUser)
})

router.get('/api/users/id/:id', currentUser, requireAuth, async (req: Request, res: Response) => {
    const existedUser = await User.findById(req.params.id)
    if (!existedUser) {
        throw new BadRequestError(`Cannot find user: ${req.params.id}`)
    }
    res.status(200).send(existedUser)
})

export { router as getUserInfoRouter }