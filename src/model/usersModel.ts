import { validate as uuidValidate, v4 as uuid } from 'uuid';
import { IUser, IChangedUserData } from '../interfaces';

let users: IUser[] = [];

export function findAll(): unknown {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

export function find(id: string): unknown {
  return new Promise((resolve, reject) => {
    try {
      if (!uuidValidate(id)) {
        throw new Error("ID isn't a uuid type");
      }
      const user = users.find((item) => item.id === id);
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
}

export function create(user: IUser): unknown {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuid(), ...user };
    users.push(newProduct);
    resolve(undefined);
  });
}

export function update(id: string, changedUserData: IChangedUserData): unknown {
  return new Promise((resolve, reject) => {
    try {
      if (!uuidValidate(id)) {
        throw new Error("ID isn't a uuid type");
      }

      users = users.map((user) => {
        if (user.id === id) {
          return { ...user, ...changedUserData };
        }
        return user;
      });

      resolve(undefined);
    } catch (error) {
      reject(error);
    }
  });
}

export function remove(id: string): unknown {
  return new Promise((resolve, reject) => {
    try {
      if (!uuidValidate(id)) {
        throw new Error("ID isn't a uuid type");
      }
      users = users.filter((user) => user.id !== id);
      resolve(undefined);
    } catch (error) {
      reject(error);
    }
  });
}
