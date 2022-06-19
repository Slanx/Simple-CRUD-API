import { IUser, IChangedUserData } from '../interfaces';
import { server } from '../server/server';
import request from 'supertest';
import 'dotenv/config';

const PORT = process.env.PORT_SERVER;

const user: IUser = {
  username: 'Rafa',
  age: 20,
  hobbies: [],
};

const putFullUser: IChangedUserData = {
  username: 'John',
  age: 15,
  hobbies: ['football'],
};

const putUser: IChangedUserData = {
  username: 'John',
};

let id: string;

const httpServer = server().listen(PORT);

describe('Сценарий 1', () => {
  it('Get all records with a GET api/users request', async () => {
    const result = await request(httpServer).get('/api/users');
    expect(result.status).toBe(200);
    expect(result.body).toHaveLength(0);
  });
  it('A new object is created by a POST api/users request', async () => {
    const result = await request(httpServer).post('/api/users').send(user);
    id = result.body.id;
    expect(result.status).toBe(201);
    expect(result.body.username).toBe('Rafa');
    expect(result.body.age).toBe(20);
    expect(result.body.hobbies).toStrictEqual([]);
  });
  it('With a GET request, we get the created record by its id', async () => {
    const result = await request(httpServer).get(`/api/users/${id}`);
    expect(result.status).toBe(200);
    expect(result.body.username).toBe('Rafa');
    expect(result.body.age).toBe(20);
    expect(result.body.hobbies).toStrictEqual([]);
  });
  it('Update the created record with a PUT request', async () => {
    const result = await request(httpServer).put(`/api/users/${id}`).send(putFullUser);
    expect(result.status).toBe(200);
    expect(result.body.username).toBe('John');
    expect(result.body.age).toBe(15);
    expect(result.body.hobbies).toStrictEqual(['football']);
  });
  it('Delete the created object by id', async () => {
    const result = await request(httpServer).delete(`/api/users/${id}`);
    expect(result.status).toBe(204);
  });
  it('Trying to get a deleted object by id', async () => {
    const result = await request(httpServer).get(`/api/users/${id}`);
    expect(result.status).toBe(404);
  });

  afterAll(() => httpServer.close());
});

describe('Сценарий 2', () => {
  it('Get all records with a GET api/users request', async () => {
    const result = await request(httpServer).get('/api/users');
    expect(result.status).toBe(200);
    expect(result.body).toHaveLength(0);
  });
  it('A new object is created by a POST api/users request', async () => {
    const result = await request(httpServer).post('/api/users').send(user);
    id = result.body.id;
    expect(result.status).toBe(201);
    expect(result.body.username).toBe('Rafa');
    expect(result.body.age).toBe(20);
    expect(result.body.hobbies).toStrictEqual([]);
  });
  it('With a GET request, we get the created record by its id', async () => {
    const result = await request(httpServer).get(`/api/users/${id}`);
    expect(result.status).toBe(200);
    expect(result.body.username).toBe('Rafa');
    expect(result.body.age).toBe(20);
    expect(result.body.hobbies).toStrictEqual([]);
  });
  it('Update the created entry with a PUT request, but not completely', async () => {
    const result = await request(httpServer).put(`/api/users/${id}`).send(putUser);
    expect(result.status).toBe(200);
    expect(result.body.username).toBe('John');
    expect(result.body.age).toBe(20);
    expect(result.body.hobbies).toStrictEqual([]);
  });
  it('Delete the created object by id', async () => {
    const result = await request(httpServer).delete(`/api/users/${id}`);
    expect(result.status).toBe(204);
  });
  it('Trying to get a deleted object by id', async () => {
    const result = await request(httpServer).get(`/api/users/${id}`);
    expect(result.status).toBe(404);
  });

  afterAll(() => httpServer.close());
});

describe('Сценарий 3', () => {
  it('Get all records with a GET api/users request', async () => {
    const result = await request(httpServer).get('/api/users');
    expect(result.status).toBe(200);
    expect(result.body).toHaveLength(0);
  });
  it('A new object is created by a POST api/users request', async () => {
    const result = await request(httpServer).post('/api/users').send({});
    expect(result.status).toBe(400);
  });
  it('With a GET request, сheck if the user does not exist', async () => {
    const result = await request(httpServer).get(`/api/users/`);
    expect(result.status).toBe(200);
    expect(result.body).toHaveLength(0);
  });

  afterAll(() => httpServer.close());
});
