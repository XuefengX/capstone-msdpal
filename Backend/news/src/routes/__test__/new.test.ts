import request from 'supertest'
import { app } from '../../app'
import { Post } from '../../models/post'

it('has a route handler listening to post requests', async () => {
    const response = await request(app)
        .post('/api/posts')
        .send({})

    expect(response.status).not.toEqual(404)
})

it('can only be accessed if the user is signed in', async () => {
    await request(app)
        .post('/api/posts')
        .send({})
        .expect(401)
})

it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/posts')
        .set('Cookie', global.signin())
        .send({})

    expect(response.status).not.toEqual(401)
})


it('return an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/posts')
        .set('Cookie', global.signin())
        .send({
            title: '',
            contents: 'contents',
            category: 'neutral'
        })
        .expect(400)
})

it('create a post with valid inputs', async () => {
    let posts = await Post.find({})
    expect(posts.length).toEqual(0)

    await request(app)
        .post('/api/posts')
        .set('Cookie', global.signin())
        .send({
            title: 'title',
            contents: 'contents',
            category: 'neutral'
        })
        .expect(201)

    posts = await Post.find({})
    expect(posts.length).toEqual(1)
    expect(posts[0].title).toEqual('title')
})

