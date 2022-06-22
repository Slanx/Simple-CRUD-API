interface IUser {
  id?: string;
  username: string;
  age: number;
  hobbies: string[] | [];
}

interface IChangedUserData {
  username?: string;
  age?: number;
  hobbies?: string[] | [];
}

interface IKeySettings {
  required: boolean;
  number?: boolean;
  string?: boolean;
  array?: string;
}

interface IBodySettings {
  [keys: string]: IKeySettings;
}

interface IRoute {
  [index: string]: () => {};
}

interface IRoutes {
  [method: string]: IRoute;
}

export { IUser, IChangedUserData, IKeySettings, IBodySettings };
