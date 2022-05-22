const request = require('supertest');
const app = require('../app');
const {
  mongoConnect,
  mongoDisconnect,
  dropCollection,
} = require('../services/mongo');

describe('Testing Todo CRUD', () => {
  beforeAll(async () => {
    await mongoConnect('test');
  });

  beforeEach(async () => {
    await dropCollection('todos');
    await request(app).post('/todos').send({
      title: 'Get Milk',
      isDone: false,
    });
  });

  afterAll(async () => {
    await dropCollection('todos');
    await mongoDisconnect();
  });

  it('POST /todos : creates a todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({
        title: 'Get Eggs',
        isDone: false,
      })
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject({
      id: 2,
      title: 'Get Eggs',
      isDone: false,
    });
  });
  it('GET /todos fetches the list of todos', async () => {
    const response = await request(app)
      .get('/todos')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject([
      {
        id: 1,
        title: 'Get Milk',
        isDone: false,
      },
    ]);
  });
  it('GET /todos/:id fetch a single todo by id', async () => {
    const response = await request(app)
      .get('/todos/1')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject({
      id: 1,
      title: 'Get Milk',
      isDone: false,
    });
  });
  it('DELETE /todo/:id delete a todo by id', async () => {
    const response = await request(app)
      .delete('/todos/1')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject({
      id: 1,
      title: 'Get Milk',
      isDone: false,
    });
  });
  it('PATCH /todos/:id update title of a todo by id', async () => {
    const response = await request(app)
      .patch('/todos/1')
      .send({
        title: 'Get 2 litres of milk',
      })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject({
      id: 1,
      title: 'Get 2 litres of milk',
      isDone: false,
    });
  });
});
