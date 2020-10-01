import mongoose from 'mongoose'
import { Password } from '../services/password'

interface InvitAttrs {
    uid: string
    code: string
}

interface InvitModel extends mongoose.Model<InvitDoc> {
    build(attrs: InvitAttrs): InvitDoc
}

interface InvitDoc extends mongoose.Document {
    uid: string
    code: string
}

const invitSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
        }
    }
})

// invitSchema.pre('save', async function (done) {
//     if (this.isModified('code')) {
//         const hashed = await Password.toHash(this.get('code'))
//         this.set('code', hashed)
//     }
//     done()
// })

invitSchema.statics.build = (attrs: InvitAttrs) => {
    return new Invit(attrs)
}

const Invit = mongoose.model<InvitDoc, InvitModel>('Invit', invitSchema)

export { Invit }