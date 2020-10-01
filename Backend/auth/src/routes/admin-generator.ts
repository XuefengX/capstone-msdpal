import { BadRequestError } from '@xuefengxu/common'
import express from 'express'
import { adminAuth } from '../middlewares/admin-auth'
import { Invit } from '../models/invitations'
import { randomBytes } from 'crypto'

const router = express.Router()

router.post('/api/admin/new_user', adminAuth, async (req, res) => {
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