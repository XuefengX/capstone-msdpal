import { Request, Response, NextFunction } from 'express'
import { NotAuthorizedError } from '@xuefengxu/common'

export const adminAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { adminPassword } = req.body
    console.log(`Password provided:  ${adminPassword}`)
    if (adminPassword != process.env.ADMIN_KEY) {
        throw new NotAuthorizedError()
    }
    next()
}