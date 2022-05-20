const request = require('supertest');
const app = require('../app');

describe('Testing GET /todos', () => {
  it('fetches the list of todos', async () => {
    const response = await request(app)
      .get('/todos')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual([
      {
        id: 1,
        title: 'Get Milk',
        isDone: false,
      },
      {
        id: 2,
        title: 'Get eggs',
        isDone: false,
      },
    ]);
  });
});
describe('Testing POST /todos', () => {
  it('creates a todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({
        id: 3,
        title: 'Drop laundry',
        isDone: true,
      })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual([
      {
        id: 1,
        title: 'Get Milk',
        isDone: false,
      },
      {
        id: 2,
        title: 'Get eggs',
        isDone: false,
      },
      {
        id: 3,
        title: 'Drop laundry',
        isDone: true,
      },
    ]);
  });
});
describe('Testing GET /todos/:id', () => {
  it('fetch a single todo by id', async () => {
    const response = await request(app)
      .get('/todos/1')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual({
      id: 1,
      title: 'Get Milk',
      isDone: false,
    });
  });
});
describe('Testing DELETE /todos/:id', () => {
  it('delete a todo by id', async () => {
    const response = await request(app)
      .delete('/todos/3')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual([
      {
        id: 1,
        title: 'Get Milk',
        isDone: false,
      },
      {
        id: 2,
        title: 'Get eggs',
        isDone: false,
      },
    ]);
  });
});
describe('Testing PATCH /todos/:id', () => {
  it('update title of a todo by id', async () => {
    const response = await request(app)
      .patch('/todos/1')
      .send({
        title: 'Get 2 litres of milk',
      })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual([
      {
        id: 1,
        title: 'Get 2 litres of milk',
        isDone: false,
      },
      {
        id: 2,
        title: 'Get eggs',
        isDone: false,
      },
    ]);
  });
});
