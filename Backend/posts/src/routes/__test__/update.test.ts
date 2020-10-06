import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'

it('return a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/posts/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'title',
            contents: 'contents',
            category: 'neutral'
        })
        .expect(404)
})

it('return a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/posts/${id}`)
        .send({
            title: 'title',
            contents: 'contents',
            category: 'neutral'
        })
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
        .put(`/api/posts/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'title1',
            contents: 'contents',
            category: 'neutral'
        })
        .expect(401)
})

it('return a 400 if the user provided invalid title', async () => {
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
        .put(`/api/posts/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            contents: 'contents',
            category: 'neutral'
        })
        .expect(400)
})

it('return a 400 if the user provided invalid contents', async () => {
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
        .put(`/api/posts/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'dfefefef',
            contents: '',
            category: 'neutral',
        })
        .expect(400)
})

it('return a 400 if the user provided invalid category', async () => {
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
        .put(`/api/posts/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'dfefefef',
            contents: 'dfaedfe',
            category: '',
        })
        .expect(400)
})

it('update post with 200', async () => {
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
        .put(`/api/posts/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'changedTitle',
            contents: 'contents',
            category: 'neutral'
        })
        .expect(200)
})



