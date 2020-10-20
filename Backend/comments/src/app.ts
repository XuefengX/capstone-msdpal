import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { errorHandler, currentUser } from '@xuefengxu/common'
import cookieSession from 'cookie-session';

import { createCommentRouter } from './routers/new'
import { updateCommentRouter } from './routers/update'
import { deleteCommentRouter } from './routers/delete'

const app = express()
app.set('trust proxy', true);
app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);
app.use(currentUser)

app.use(createCommentRouter)
app.use(updateCommentRouter)
app.use(deleteCommentRouter)

app.use(errorHandler)

export { app }