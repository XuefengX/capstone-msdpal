import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { errorHandler } from '@xuefengxu/common'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { adminRouter } from './routes/admin'
import { generateCodeRouter } from './routes/admin-generator'
import { getCodeRouter } from './routes/admin-get-code'
import { getUserInfoRouter } from './routes/get-user'


const app = express()
app.set('trust proxy', true);
app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: true
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

app.use(errorHandler)

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT key must be defined")
    }
    if (!process.env.ADMIN_KEY) {
        throw new Error("Admin key must be defined")
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log("Connected to MongoDB")
    } catch (err) {
        console.error(err)
    }
}

app.listen(3000, () => {
    console.log('Auth service start running. Listen to port 3000')
})

start()