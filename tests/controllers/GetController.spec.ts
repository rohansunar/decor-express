import supertest from 'supertest';
import app, { close } from '../../src/example/index';
const request = supertest(app());

afterAll(() => {
    // Close server or any cleanup needed after tests
    close();
});

describe('API Endpoints', () => {
    it('should get response 200 with success message', (done) => {
        request
            .get(`/`)
            .expect(200)
            .end(function (err, res) {
                expect(err).toBeNull;
                expect(res.body.address).toEqual('Root Controller');
                done();
            });
    });
    it('should return a hello message', async () => {
        const res = await request.get('/contact');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('address', 'Root Controller');
    });
});
