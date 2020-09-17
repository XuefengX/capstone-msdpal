import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { User, buildUser } from '../models/user'
import { RequestValidationError, BadRequestError } from '@xuefengxu/common'
const router = express.Router()

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
], async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        console.log(`Email in use: ${email}`)
        throw new BadRequestError("Email in use")
    }

    const user = buildUser({ email, password })
    await user.save()
    console.log(`Create a user ${email}`)
    res.status(201).send(user)
})

export { router as signupRouter }