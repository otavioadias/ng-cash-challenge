import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { app } from '../app';
import UserService from '../services/UserService';

chai.use(chaiHttp);

describe('Teste da rota /registration', () => {
    describe('Quando o campo username não é informado', () => {
        it('Deve retornar o status 400 e "message": "\"username\" is required"', async () => {
            const httpResponse = await chai
            .request(app)
            .post('/registration')
            .send({ password: 'otavio123'})
            expect(httpResponse.status).to.equal(400);
            expect(httpResponse.body).to.be.deep.equal({ message: "\"username\" is required" });
        });
    });

    describe('Quando o campo username é vazio', () => {
        it('Deve retornar o status 400 e "\"username\" is not allowed to be empty"', async () => {
            const httpResponse = await chai
            .request(app)
            .post('/registration')
            .send({ username: '', password: 'otavio123'})
            expect(httpResponse.status).to.equal(400);
            expect(httpResponse.body).to.be.deep.equal({ message: "\"username\" is not allowed to be empty" });
        });
    });

    describe('Quando o campo password não é informado', () => {
        it('Deve retornar o status 400 e "message": "\"password\" is required"', async () => {
            const httpResponse = await chai
            .request(app)
            .post('/registration')
            .send({ username: 'otavio'})
            expect(httpResponse.status).to.equal(400);
            expect(httpResponse.body).to.be.deep.equal({ message: "\"password\" is required" });
        });
    });

    describe('Quando o campo password é vazio', () => {
        it('Deve retornar o status 400 e "\"password\" is not allowed to be empty"', async () => {
            const httpResponse = await chai
            .request(app)
            .post('/registration')
            .send({ username: 'user', password: ''})
            expect(httpResponse.status).to.equal(400);
            expect(httpResponse.body).to.be.deep.equal({ message: "\"password\" is not allowed to be empty" });
        });
    });

    describe('Quando o campo username é informado com menos de 3 caracteres', () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2Njg2ODg5MjEsImV4cCI6MTY2ODc3NTMyMX0.cFmgVxuBhpA37WbVZ1U_tx6bphWQNrqM3-W2kN1mWqw"
        beforeEach(() => sinon.stub(UserService.prototype, 'newUser').resolves({ token }));
        afterEach(() => sinon.restore());
        it('Deve retornar o status 400 e uma mensagem de erro', async () => {
            const httpResponse = await chai
            .request(app)
            .post('/registration')
            .send({ username: 'us', password: 'User1234'})
            expect(httpResponse.status).to.equal(400);
            expect(httpResponse.body).to.be.deep.equal({ message: "\"username\" length must be at least 3 characters long" });
        });
    });

    describe('Quando o campo password é informado com menos de 8 caracteres', () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2Njg2ODg5MjEsImV4cCI6MTY2ODc3NTMyMX0.cFmgVxuBhpA37WbVZ1U_tx6bphWQNrqM3-W2kN1mWqw"
        beforeEach(() => sinon.stub(UserService.prototype, 'newUser').resolves({ token }));
        afterEach(() => sinon.restore());
        it('Deve retornar o status 400 e uma mensagem de erro', async () => {
            const httpResponse = await chai
            .request(app)
            .post('/registration')
            .send({ username: 'user', password: 'Ust123'})
            expect(httpResponse.status).to.equal(400);
            expect(httpResponse.body).to.be.deep.equal({ message: "\"password\" with value \"Ust123\" fails to match the required pattern: /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\\d]{8,}$/" });
        });
    });

    describe('Quando os campos username e password são informado', () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2Njg2ODg5MjEsImV4cCI6MTY2ODc3NTMyMX0.cFmgVxuBhpA37WbVZ1U_tx6bphWQNrqM3-W2kN1mWqw"
        beforeEach(() => sinon.stub(UserService.prototype, 'newUser').resolves({ token }));
        afterEach(() => sinon.restore());
        it('Deve retornar o status 201 e um token', async () => {
            const httpResponse = await chai
            .request(app)
            .post('/registration')
            .send({ username: 'user', password: 'User1234'})
            expect(httpResponse.status).to.equal(201);
            expect(httpResponse.body).to.be.deep.equal({ token });
        });
    });
});