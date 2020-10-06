import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { User } from '../models/user'
import { Invit } from '../models/invitations'
import { BadRequestError, validateRequest } from '@xuefengxu/common'
import jwt from 'jsonwebtoken'
const router = express.Router()

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters'),
    body('uid')
        .not()
        .isEmpty()
        .withMessage('Uid cannot be empty'),
    body('code')
        .not()
        .isEmpty()
        .withMessage('Code cannot be empty'),
    body('username')
        .not()
        .isEmpty()
        .withMessage('Username cannot be empty'),
    body('firstName')
        .not()
        .isEmpty()
        .withMessage('First name cannot be empty'),
    body('lastName')
        .not()
        .isEmpty()
        .withMessage('Last name cannot be empty'),
    body('gradYear')
        .not()
        .isEmpty()
        .withMessage('Graduation year cannot be empty')
        .isNumeric()
        .withMessage('Grad year must be number')
], validateRequest, async (req: Request, res: Response) => {
    const {
        email,
        password,
        uid,
        code,
        username,
        firstName,
        lastName,
        gradYear,
        placement,
        intro,
        avatar
    } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        // console.log(`Email in use: ${email}`)
        throw new BadRequestError("Email in use")
    }
    const existingName = await User.findOne({ username })
    if (existingName) {
        throw new BadRequestError("Username in use")
    }

    const existingCode = await Invit.findOne({ uid })
    if (!existingCode) {
        console.log(`No invitation code found: ${uid}`)
        throw new BadRequestError("Not an alumni")
    }
    const invitMatch = existingCode.code === code
    if (!invitMatch) {
        throw new BadRequestError('Invalid Invitation Code')
    }

    const user = User.build({
        email,
        password,
        username,
        firstName,
        lastName,
        code,
        gradYear,
        placement,
        intro,
        avatar,
        uid
    })
    await user.save()

    // generate JWT
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, process.env.JWT_KEY!)

    // store it in the cookie session
    req.session = {
        jwt: userJwt
    }

    // console.log(`Create a user ${email}`)
    res.status(201).send(user)
})

export { router as signupRouter }