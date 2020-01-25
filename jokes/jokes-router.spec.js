const request = require('supertest');
const server = require('../api/server.js');

const db = require('../database/dbConfig.js');

let token;

// beforeAll will run this code before any of the tests in this file run
beforeAll(done => {
    db('users').truncate()
    request(server).post('/api/auth/register').send({ username: 'Jenny', password: 'jennyiscool' })
    .end((err, response) => {
        token = response.body.token;
        done();
    });
});

describe('jokes-router tests', () => {

    describe('GET the jokes from the API', () => {
        it('should respond with 200 OK', () => {
            return request(server)
                    .get('/api/jokes')
                    .set('Authorization', `Bearer ${token}`)
                    .then(res => {
                        expect(res.status).toBe(200);
                        expect(res.type).toBe('application/json');
                    });
        });
    })
})