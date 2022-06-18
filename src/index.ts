import http from 'http';
import 'dotenv/config';
import {
  getUsers,
  getUser,
  addUser,
  pageNotFound,
  updateUser,
  deleteUser,
} from './controller/usersConroller';

const PORT = process.env.PORT_SERVER;

const server = http.createServer((req, res) => {
  try {
    const url = req.url!;
    const id = url ? url.split('/')[3] : null;
    const validUrl = url[url.length - 1] === '/' ? url.slice(0, url.length - 1) : url;

    if (validUrl === '/api/users' && req.method === 'GET') {
      getUsers(res);
    } else if (validUrl === '/api/users' && req.method === 'POST') {
      addUser(req, res);
    } else if (validUrl === `/api/users/${id!}` && req.method === 'GET') {
      getUser(res, id!);
    } else if (validUrl === `/api/users/${id!}` && req.method === 'PUT') {
      updateUser(req, res, id!);
    } else if (validUrl === `/api/users/${id!}` && req.method === 'DELETE') {
      deleteUser(res, id!);
    } else {
      pageNotFound(req, res);
    }
  } catch (error) {}
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
