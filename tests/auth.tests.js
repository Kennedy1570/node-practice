const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('POST /login', () => {
    it('should return user data for valid credentials', async() => {
        const res = await request
        .post('/login')
        .send({ email: 'test@email.com', password: 'password123' });
        expect(res.status).toBe(200);
        expect(res.body.uid).toBeDefined();
    });
    it('should return 401 for invalid credentials', async() => {
        const res = await request
        .post('/login')
        .send({ email: 'invalid@email.com', password: 'wrongpassword' });
        expect(res.status).toBe(401);
        expect(res.body).toBe('Invalid credentials');
    });
    it('should return 400 for a bad request missing email or password', async() => {
        const res = await request
        .post('/login')
        .send({ email: '', password: 'password123' });
        expect(res.status).toBe(400);
        expect(res.body).toBe('Email and password are required');
    });
});