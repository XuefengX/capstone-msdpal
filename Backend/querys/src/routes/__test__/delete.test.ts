import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'

it('return a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .delete(`/api/posts/${id}`)
        .set('Cookie', global.signin())
        .send({})
        .expect(404)
})

it('return a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .delete(`/api/posts/${id}`)
        .send({})
        .expect(401)
})

it('return a 401 if the user is not the author', async () => {
    const response = await request(app)
        .post('/api/posts')
        .set('Cookie', global.signin())
        .send({
            title: 'title',
            contents: 'contents',
            category: 'neutral'
        })

    await request(app)
        .delete(`/api/posts/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({})
        .expect(401)
})

it('delete post with 200', async () => {
    const cookie = global.signin()

    const response = await request(app)
        .post('/api/posts')
        .set('Cookie', cookie)
        .send({
            title: 'title',
            contents: 'contents',
            category: 'neutral'
        })

    await request(app)
        .delete(`/api/posts/${response.body.id}`)
        .set('Cookie', cookie)
        .send({})
        .expect(200)
})


