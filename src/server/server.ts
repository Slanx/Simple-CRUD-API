import http from 'http';
import {
  getUsers,
  getUser,
  addUser,
  pageNotFound,
  updateUser,
  deleteUser,
  serverError,
} from '../controller/userContorller';

export const server = () => {
  return http.createServer((req, res) => {
    try {
      const url = req.url!;
      const id = url ? url.split('/')[3] : null;
      const validUrl = url[url.length - 1] === '/' ? url.slice(0, url.length - 1) : url;
      console.log(`Process ${process.pid} handles request ${req.method} at address: ${validUrl}`);

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
        pageNotFound(res);
      }
    } catch (error) {
      serverError(res);
    }
  });
};
