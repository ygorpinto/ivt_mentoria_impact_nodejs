const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js'); // Certifique-se de ajustar o caminho conforme necessário
const expect = chai.expect;

chai.use(chaiHttp);

describe('API Routes', () => {
  it('should get data from /api/get', (done) => {
    chai
      .request(app)
      .get('/api/get')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('string');
        done();
      });
  });

  it('should create data on /api/post', (done) => {
    chai
      .request(app)
      .post('/api/post')
      .send({ data: 'example' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equal('Rota POST: Criando dados');
        expect(res.body.data).to.equal('example');
        done();
      });
  });

  it('should update data on /api/put/:id', (done) => {
    chai
      .request(app)
      .put('/api/put/1') // Assuming there is data with ID 1
      .send({ newData: 'updatedExample' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equal('Rota PUT: Atualizando dados para o ID 1');
        expect(res.body.data.newData).to.equal('updatedExample');
        done();
      });
  });

  it('should delete data on /api/delete/:id', (done) => {
    chai
      .request(app)
      .delete('/api/delete/1') // Assuming there is data with ID 1
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equal('Rota DELETE: Deletando dados para o ID 1');
        done();
      });
  });
});
