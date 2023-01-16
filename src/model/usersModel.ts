import { validate as uuidValidate, v4 as uuid } from 'uuid';
import { IChangedUserData, IUser } from '../interfaces';
import { users, setUsers } from '../dataBase/users';

export function findAll() {
  return new Promise((resolve, reject) => {
    try {
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
}

export function find(id: string) {
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

export function create(user: IUser) {
  return new Promise((resolve, reject) => {
    try {
      const newProduct = { id: uuid(), ...user };
      const newUsers = users;
      newUsers.push(newProduct);
      setUsers(newUsers);
      resolve(newProduct);
    } catch (e) {
      reject(e);
    }
  });
}

export function update(id: string, changedUserData: IChangedUserData) {
  return new Promise((resolve, reject) => {
    try {
      if (!uuidValidate(id)) {
        throw new Error("ID isn't a uuid type");
      }
      let updateUser;
      const newUsers = users.map((user) => {
        if (user.id === id) {
          updateUser = { ...user, ...changedUserData };
          return updateUser;
        }
        return user;
      });
      setUsers(newUsers);
      resolve(updateUser);
    } catch (error) {
      reject(error);
    }
  });
}

export function remove(id: string) {
  return new Promise((resolve, reject) => {
    try {
      if (!uuidValidate(id)) {
        throw new Error("ID isn't a uuid type");
      }
      let removedUser;
      const newUsers = users.filter((user) => {
        if (user.id == id) {
          removedUser = user;
        }
        return user.id !== id;
      });
      setUsers(newUsers);
      resolve(removedUser);
    } catch (error) {
      reject(error);
    }
  });
}
