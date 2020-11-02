import express from 'express'
import { NotAuthorizedError } from '@xuefengxu/common'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/api/admin/login', (req, res) => {
    console.log("Administrator logged in")
    const { adminPassword } = req.body
    // console.log(`Password provided:  ${adminPassword}`)
    if (adminPassword != process.env.ADMIN_KEY) {
        throw new NotAuthorizedError()
    }
    const adminStatus = { userStatus: "admin" }
    const adminJwt = jwt.sign(adminStatus, process.env.JWT_KEY!)

    // store it in the cookie session
    req.session = {
        jwt: adminJwt
    }

    res.status(200).send(adminStatus)
})

export { router as adminRouter }