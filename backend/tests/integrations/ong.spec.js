const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });
  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
    .post('/ongs')
    // .set('Authorization', 'id de login de uma ong')
    .send({
      name: "APAD2",
      email: "contato@apad2.com.br",
      whatsapp: "4711111111",
      city: "Rio do Norte",
      uf: "SC"
    });
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});