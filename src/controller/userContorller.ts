import { findAll, find, create, update, remove } from '../model/usersModel';
import { validateJSON } from '../helper/validateUser';
import http from 'http';

export const getUsers = async (res: http.ServerResponse) => {
  try {
    const product = await findAll();

    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(JSON.stringify(product));
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (res: http.ServerResponse, id: string) => {
  try {
    const product = await find(id);

    if (!product) {
      res.writeHead(404, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ message: 'Sorry, user not found... ' }));
    } else {
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    res.writeHead(400, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'Sorry, Id is not uuid type' }));
  }
};

export const addUser = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const user = JSON.parse(body);

      const isUser = await validateJSON(user, {
        username: { required: true, string: true },
        age: { required: true, number: true },
        hobbies: { required: true, array: 'string' },
      });

      if (isUser) {
        const newUser = await create(user);

        res.writeHead(201, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(newUser));
      } else {
        res.writeHead(400, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({ message: 'Request body does not contain required fields' }));
      }
    });
    res.on('error', async (error) => {
      throw error;
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
) => {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const updatedDataUser = JSON.parse(body);

      const isUser = await validateJSON(updatedDataUser, {
        username: { required: false, string: true },
        age: { required: false, number: true },
        hobbies: { required: false, array: 'string' },
      });

      if (isUser) {
        const updatedUser = await update(id, updatedDataUser);

        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(updatedUser));
      } else {
        res.writeHead(400, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({ message: 'Request body does not contain required fields' }));
      }
    });
  } catch (error) {
    res.writeHead(400, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'Sorry, Id is not uuid type' }));
  }
};

export const deleteUser = async (res: http.ServerResponse, id: string) => {
  try {
    const deletedUser = await remove(id);

    if (!deletedUser) {
      res.writeHead(404, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ message: 'Sorry, user not found... ' }));
    } else {
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(deletedUser));
    }
  } catch (error) {
    res.writeHead(400, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'Sorry, Id is not uuid type' }));
  }
};

export const pageNotFound = (res: http.ServerResponse) => {
  res.writeHead(404, { 'Content-type': 'application/json' });
  res.end(JSON.stringify({ message: 'Sorry, page not found' }));
};

export const serverError = (res: http.ServerResponse) => {
  res.writeHead(500, { 'Content-type': 'application/json' });
  res.end(JSON.stringify({ message: 'Internal Server Error' }));
};
