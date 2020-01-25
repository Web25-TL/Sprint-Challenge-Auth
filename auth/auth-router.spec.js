const request = require('supertest');
const server = require('../api/server.js');

const db = require('../database/dbConfig.js');


describe('auth-router testing', () => {

    describe('registering a user', () => {
        it('should return 201 OK', () => {
            return db('users').truncate() // <-start fresh each test
                    .then(() => {
                        return request(server).post('/api/auth/register').send({ username: 'Micah', password: 'passness' })
                    })
                    .then(res => {
                        expect(res.status).toBe(201);
                    })
        });

        it('should return a JSON object', () => {
            return db('users').truncate() // <-start fresh each test
                    .then(() => {
                        return request(server).post('/api/auth/register').send({ username: 'Micah', password: 'passness' })
                    })
                    .then(res => {
                        expect(res.type).toBe('application/json');
                    })
        });

        it('should return a token in the body', () => {
            return db('users').truncate() // <-start fresh each test
                    .then(() => {
                        return request(server).post('/api/auth/register').send({ username: 'Micah', password: 'passness' })
                    })
                    .then(res => {
                        expect(res.body.token).toBeDefined();
                    })
        });
    });

    describe('logging in a user', () => {
        it('should return 200 OK', () => {
            return db('users').truncate() // <-start fresh each test
            .then(() => { // register a user before logging in that user
                return request(server).post('/api/auth/register').send({ username: 'Micah', password: 'passness' })
            })
            .then(() => {
                return request(server).post('/api/auth/login').send({ username: 'Micah', password: 'passness' })
            })
            .then(res => {
                expect(res.status).toBe(200);
            });
        });

        it('should return a JSON object', () => {
            return db('users').truncate() // <-start fresh each test
            .then(() => { // register a user before logging in that user
                return request(server).post('/api/auth/register').send({ username: 'Micah', password: 'passness' })
            })
            .then(() => {
                return request(server).post('/api/auth/login').send({ username: 'Micah', password: 'passness' })
            })
            .then(res => {
                expect(res.type).toBe('application/json');
            });
        });

        it('should return a token in the body', () => {
            return db('users').truncate() // <-start fresh each test
            .then(() => { // register a user before logging in that user
                return request(server).post('/api/auth/register').send({ username: 'Micah', password: 'passness' })
            })
            .then(() => {
                return request(server).post('/api/auth/login').send({ username: 'Micah', password: 'passness' })
            })
            .then(res => {
                expect(res.body.token).toBeDefined();
            });
        });
    })
})