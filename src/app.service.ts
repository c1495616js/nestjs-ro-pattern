import { Injectable } from '@nestjs/common';

interface Article {
  id: number;
  name: string;
}
interface User {
  id: number;
  email: string;
  password: string;
  articles?: Article[];
}
const users = [
  {
    id: 1,
    email: 'user1@email.com',
    password: 'password1',
    articles: [
      { id: 1, name: 'article1' },
      { id: 2, name: 'article2' },
    ],
  },
  { id: 2, email: 'user2@email.com', password: 'password2' },
];
@Injectable()
export class AppService {
  findAll(): User[] {
    return users;
  }
}
