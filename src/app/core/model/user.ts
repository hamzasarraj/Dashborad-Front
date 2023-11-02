import {Application} from './application';

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  applications: Application [];
}
