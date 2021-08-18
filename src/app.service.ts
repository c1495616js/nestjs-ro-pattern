import { Injectable } from '@nestjs/common';

interface User {
  id: number;
  email: string;
  password: string;
}

@Injectable()
export class AppService {
  users: [
    { id: 1; email: 'user1@email.com'; password: 'password1' },
    { id: 2; email: 'user2@email.com'; password: 'password2' },
  ];
  findAll(): User[] {
    return this.users;
  }
}
