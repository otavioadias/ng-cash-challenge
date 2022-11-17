import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { app } from '../app';
import AccountService from '../services/AccountService';

chai.use(chaiHttp);

describe('Teste da rota /account', () => {
    describe('Faz a validação de usuário e retorna o id e balance', () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2Njg2OTA1OTAsImV4cCI6MTY2ODc3Njk5MH0.c33uQvCiV_iKdRyzoD7LD1kB3tSNYkLZuhQXRs_W23k"
        const userAccount = {
            id: 1,
            balance: 100
          }
        beforeEach(() => sinon.stub(AccountService.prototype, 'visualizerAccount').resolves(userAccount));
        afterEach(() => sinon.restore());
        it('Deve retornar o status 200 e o id e balance do usuário', async () => {
            const httpResponse = await chai
            .request(app)
            .get('/account')
            .send({ token })
            expect(httpResponse.status).to.equal(200);
            expect(httpResponse.body).to.be.deep.equal(userAccount);
        });
    });
});