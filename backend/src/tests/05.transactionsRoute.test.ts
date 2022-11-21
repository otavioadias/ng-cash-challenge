import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { app } from '../app';
import TransactionService from '../services/TransactionsService';
import Transactions from "../database/models/Transactions";
import transactions, { credited } from './transactions';

chai.use(chaiHttp);

describe('Teste da rota /transactions', () => {
    describe('Faz a uma nova transação e retorna o ela se sucesso', () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik90YXZpbzEiLCJpYXQiOjE2Njg5ODg4NzMsImV4cCI6MTY2OTA3NTI3M30.44gj1Y9cchajjbLAaBI5z6faV9OOOdH8uH8vGpTK9aA"
        const newTransaction = {
            "username": "Otavio2",
            "value": 7
          };
        const transaction = {
            "id": 1,
            "debitedAccountId": 3,
            "creditedAccountId": 2,
            "value": 7,
            "createdAt": "2022-11-21T15:23:12.698Z"
          }

        beforeEach(() => sinon.stub(TransactionService.prototype, 'transaction').resolves(transaction as unknown as Transactions[]));
        afterEach(() => sinon.restore());
        it('Deve retornar o status 201 e informações da transação', async () => {
            const httpResponse = await chai
            .request(app)
            .put('/transactions')
            .set('authorization', token)
            .send(newTransaction)
            expect(httpResponse.status).to.equal(201);
            expect(httpResponse.body).to.be.deep.equal(transaction);
        });
    });

    describe('Visualiza todas as transações realizadas pelo usuário', () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik90YXZpbzEiLCJpYXQiOjE2Njg5ODg4NzMsImV4cCI6MTY2OTA3NTI3M30.44gj1Y9cchajjbLAaBI5z6faV9OOOdH8uH8vGpTK9aA"

      beforeEach(() => sinon.stub(TransactionService.prototype, 'viewTransaction').resolves(transactions as unknown as Transactions[]));
      afterEach(() => sinon.restore());
      it('Deve retornar o status 200 e informações da transação', async () => {
          const httpResponse = await chai
          .request(app)
          .get('/transactions')
          .send({ token })
          expect(httpResponse.status).to.equal(200);
          expect(httpResponse.body).to.be.deep.equal(transactions);
      });
  });

  describe('Visualiza todas as transações de cash-out realizadas pelo usuário', () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik90YXZpbzEiLCJpYXQiOjE2Njg5ODg4NzMsImV4cCI6MTY2OTA3NTI3M30.44gj1Y9cchajjbLAaBI5z6faV9OOOdH8uH8vGpTK9aA"

    beforeEach(() => sinon.stub(TransactionService.prototype, 'debitedTransaction').resolves(transactions as unknown as Transactions[]));
    afterEach(() => sinon.restore());
    it('Deve retornar o status 200 e informações da transação', async () => {
        const httpResponse = await chai
        .request(app)
        .get('/transactions/debited')
        .send({ token })
        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.be.deep.equal(transactions);
    });
});

describe('Visualiza todas as transações de cash-in realizadas pelo usuário', () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik90YXZpbzEiLCJpYXQiOjE2Njg5ODg4NzMsImV4cCI6MTY2OTA3NTI3M30.44gj1Y9cchajjbLAaBI5z6faV9OOOdH8uH8vGpTK9aA"

  beforeEach(() => sinon.stub(TransactionService.prototype, 'creditedTransaction').resolves(credited as unknown as Transactions[]));
  afterEach(() => sinon.restore());
  it('Deve retornar o status 200 e informações da transação', async () => {
      const httpResponse = await chai
      .request(app)
      .get('/transactions/credited')
      .send({ token })
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.be.deep.equal(credited);
  });
});
});