const request = require('supertest');
const app = require('./index.js');

// Testes Jest
describe('Testes para a API', () => {
  test('GET /api/v1/users', async () => {
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

  test('DELETE /api/v1/users/:nome', async () => {
    app.users = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }];
    const response = await request(app).delete('/api/v1/users/Bob');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: 'failed',
      message: 'Usuario com nome Bob nao existe',
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
});
