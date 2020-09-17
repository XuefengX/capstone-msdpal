import mongoose from 'mongoose'
import { Password } from '../services/password'

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
    email: string;
    password: string;
}


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})

const User = mongoose.model('User', userSchema)

const buildUser = (attrs: UserAttrs) => {
    return new User(attrs)
}

export { User, buildUser }