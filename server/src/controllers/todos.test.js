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
    await request(app).post('/v1/todos').send({
      title: 'Get Milk',
      isDone: false,
    });
  });

  afterAll(async () => {
    await dropCollection('todos');
    await mongoDisconnect();
  });

  it('POST /v1/todos : creates a todo', async () => {
    const response = await request(app)
      .post('/v1/todos')
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
  it('GET v1/todos fetches the list of todos', async () => {
    const response = await request(app)
      .get('/v1/todos')
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
  it('GET v1/todos/:id fetch a single todo by id', async () => {
    const response = await request(app)
      .get('/v1/todos/1')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject({
      id: 1,
      title: 'Get Milk',
      isDone: false,
    });
  });
  it('DELETE v1/todo/:id delete a todo by id', async () => {
    const response = await request(app)
      .delete('/v1/todos/1')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject({
      id: 1,
      title: 'Get Milk',
      isDone: false,
    });
  });
  it('PATCH v1/todos/:id update title of a todo by id', async () => {
    const response = await request(app)
      .patch('/v1/todos/1')
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
