import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app';

chai.use(chaiHttp);

describe('Teste da rota inicial', () => {
    describe('Quando a requisição é feita com sucesso', () => {
        it('Deve retornar o status 200 e "true" como resposta', async () => {
            const httpResponse = await chai.request(app).get('/');
            expect(httpResponse.status).to.equal(200);
            expect(httpResponse.body).to.deep.equal({ ok: true });
        })
    })
})