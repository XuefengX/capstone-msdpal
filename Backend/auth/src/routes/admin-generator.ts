import { BadRequestError, validateRequest, } from '@xuefengxu/common'
import express, { Request, Response } from 'express'
import { adminAuth } from '../middlewares/admin-auth'
import { Invit } from '../models/invitations'
import { randomBytes } from 'crypto'
import { body } from 'express-validator'

const router = express.Router()

router.post('/api/admin/new_user', adminAuth, [
    body('uid')
        .not()
        .isEmpty()
        .withMessage("Must provide uid")
], validateRequest, async (req: Request, res: Response) => {
    const { uid } = req.body
    console.log(`try to create user with uid: ${uid}`)
    const existingUser = await Invit.findOne({ "uid": uid }, function (err, result) {
        if (err) {
            console.log(`err: ${err}`)
        }
    })
    if (existingUser) {
        throw new BadRequestError(`Uid in use: ${uid}`)
    }
    const code = randomBytes(8).toString('hex')
    const user = Invit.build({ uid, code })
    await user.save()
    res.status(201).send(user)
})

export { router as generateCodeRouter }