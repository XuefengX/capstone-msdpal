import request from 'supertest'
import { app } from '../../app'

it('returns a 200 on successful admin sign in', async () => {
    return request(app)
        .post('/api/admin/login')
        .send({
            adminPassword: "adminpassword"
        })
        .expect(200)
})