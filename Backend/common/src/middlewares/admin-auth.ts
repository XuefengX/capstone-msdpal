import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { NotAuthorizedError } from "../errors/not-authorized-error"


interface AdminPayload {
    userStatus: string
}

declare global {
    namespace Express {
        interface Request {
            currentAdmin?: AdminPayload
        }
    }
}

export const adminAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) {
        throw new NotAuthorizedError()
    }
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as AdminPayload
        req.currentAdmin = payload
    } catch (err) { }
    if (!req.currentAdmin) {
        throw new NotAuthorizedError()
    }
    return next()
}