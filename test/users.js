import { expect } from "chai";
import supertest from "supertest";
const request = supertest('https://gorest.co.in/public/v2/');
const TOKEN = 'ffc5cab0257e3119215cac873a16b0a31b8c2d0160d93b66774fb1da717e10b2';

describe('Users', () => {
    it('GET /users', () => {
        return request.get(`users?access-token=${TOKEN}`).then((res) => {
            expect(res.body).not.to.be.empty;
            console.log(res.body);
        });
    });

    it('GET /users/id', () => {
        return request.get(`users/675?access-token=${TOKEN}`).then((res) => {
            expect(res.body.id).to.be.eq(675);
            expect(res.body.name).to.eq('Mrs. Abhaya Johar');
            expect(res.body.status).to.eq('active');
            
        });
    });

    it('POST /users', () => {
        const data = {
            email : `Scenario-${Math.floor(Math.random() * 8888)}@gmail.com`,
            name : `Scenario-${Math.floor(Math.random() * 8888)}`,
            gender : 'Male',
            status : 'active'
        };

        return request
        .post(`users`)
        .set("Authorization",`Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
            console.log(res.body)
            expect(res.body.email).to.eq(data.email)
            expect(res.body.name).to.eq(data.name)
        });
    });
})