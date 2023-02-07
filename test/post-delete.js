import { expect } from "chai";
import supertest from "supertest";
const request = supertest('https://gorest.co.in/public/v2/');
const TOKEN = 'ffc5cab0257e3119215cac873a16b0a31b8c2d0160d93b66774fb1da717e10b2';

describe('Users', () => {
    let userId;

    describe('POST', () => {
        it('/users', () => {
            const data = {
                email : `Scenario-${Math.floor(Math.random() * 8888)}@gmail.com`,
                name : `Scenario-${Math.floor(Math.random() * 8888)}`,
                gender : 'male',
                status : 'active'
            };
    
            return request
            .post(`users`)
            .set("Authorization",`Bearer ${TOKEN}`)
            .send(data)
            .then((res) => {
                //console.log(res.body)
                expect(res.body).to.deep.include(data);
                userId = res.body.id;
                //console.log(userId);
            });
        });

    });

    describe('GET', () => {
        it('/users/id', () => {
            return request.get(`users/${userId}?access-token=${TOKEN}`).then((res) => {
                expect(res.body.id).to.be.eq(userId);
                
            });
        });
    });

    describe('PUT', () => {
        it('/users/id', () => {

            const data = {
                gender : 'female',
                status : 'inactive'
            };
            
            return request
            .put(`users/${userId}`)
            .set("Authorization",`Bearer ${TOKEN}`)
            .send(data)
            .then((res) => {
                //console.log(res.body)
                expect(res.body).to.deep.include(data);
            });
                
        });
    });

    describe('DELETE', () => {
        it('/users/id', () => {  
            return request
            .delete(`users/${userId}`)
            .set("Authorization",`Bearer ${TOKEN}`)
            .then((res) => {
                //console.log(res.body)
                expect(res.body).to.be.empty;
            });
                
        });
    });

    
})