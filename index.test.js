const request = require('supertest');
const app = require('./index.js');

// Testes Jest
describe('Testes para a API de usuarios', () => {
  test('GET /api/v1/users', async () => { // GET POST PUT
    const response = await request(app).get('/api/v1/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /api/v1/users', async () => {
    const newUser = { name: 'John' };
    const response = await request(app).post('/api/v1/users').send(newUser);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: 'success',
      message: newUser,
    });
  });

  test('DELETE /api/v1/users/:nome - usuário não existe', async () => {
    const response = await request(app).delete('/api/v1/users/NonexistentUser');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: 'failed',
      message: 'Usuario com nome NonexistentUser nao existe',
    });
  });

  test ('PUT /api/v1/users/:nome', async () => {
    const newUser = { name: 'Joao' };
    await request(app).post('/api/v1/users').send(newUser);
    const response = await request(app).put('/api/v1/users/Joao').send({name: "Maria"});
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: "success",
      message: "Usuario com nome Joao atualizado para Maria"
    });
  })

});
