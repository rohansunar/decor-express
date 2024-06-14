import supertest from 'supertest';
import app, { close } from '../../src/example/index';
const request = supertest(app());

afterAll(() => {
    // Close server or any cleanup needed after tests
    close();
});

describe('API Endpoints', () => {
    it('should get response 200 with success message', async () => {
        const res = await request.get(`/blog`);
        expect(res.statusCode).toEqual(200);
        expect(res.body._id).toEqual('830493kdiei033-303939kfkdk');
        expect(res.body.name).toEqual("User - 'this value has been set from middleware'");
        expect(res.body.address).toEqual('Siliguri');
    });
    it('should return a hello message', async () => {
        const res = await request.get('/blog/create');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', "Post Create - 'this value has been set from middleware'");
    });
});
