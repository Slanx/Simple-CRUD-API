import { IUser } from '../interfaces';

let users: IUser[] = [];

const setUsers = (newUsers: IUser[]) => {
  users = newUsers;
};

export { users, setUsers };
