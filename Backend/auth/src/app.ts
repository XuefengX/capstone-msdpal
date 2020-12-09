import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { errorHandler } from '@xuefengxu/common'
import cors from 'cors'

import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { adminRouter } from './routes/admin-login'
import { generateCodeRouter } from './routes/admin-generator'
import { getCodeRouter } from './routes/admin-get-code'
import { getUserInfoRouter } from './routes/get-user'
import { getAllUsersRouter } from './routes/get-all-users'
import { getMeRouter } from './routes/get-current-user-info'
import { updateRouter } from './routes/update'
import { adminSignoutRouter } from './routes/admin-logout'

const app = express()

// must set cors to avoid cross domain warning
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.set('trust proxy', true);
app.use(json())
app.use(
    cookieSession({
        signed: false,
        // secure: process.env.NODE_ENV !== 'test',
        secure: false,
        httpOnly: false,
        //domain: 'localhost:3000'
    })
);
app.use(adminRouter)
app.use(generateCodeRouter)
app.use(getCodeRouter)
app.use(getUserInfoRouter)
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(updateRouter)
app.use(getAllUsersRouter)
app.use(getMeRouter)
app.use(adminSignoutRouter)

app.use(errorHandler)

export { app }