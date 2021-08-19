<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Nest.js RO Pattern

### Context

We've been using the RO for longer time,

I'm obeserving 3 things bothering me(as developer is lazy...):
- have to write `[key]: this[key]` many times if there are many properties in the `Entity`.
- need a `map` to iterate `Entity[]` and calling `toResponseObject()`.
- Furthermore, for `1-to-many` relationship, for example, user has many articles, then need to add `map` in `toResponseObject` too.

```ts
class UserRO {
  id: number;
  email: string;
  articles?: ArticleRO[]
  ...
}

class UserEntity {
  id: number;
  email: string;
  password: string;

  @OneToMany()
  articles?: Article[]
  ...

  toResponseObject() {
    return {
      id: this.id,
      email: this.email,

      articles: this.articles.map(a => a.toResponseObject()),
      ...
    }
  }
}

class UserService {
  ...

  async findAll(): Promise<UserRO[]> {
    return users.map(u => u.toResponseObject());
  }
}
```


### Solutions

I found by using `class-transformer` and `interceptors` would be a more elegant approach.

- No more `map`, and no more `toResponseObject`.

> Notice: `user.dto.ts` is equal to `UserRO`, `article.dto.ts` is equal to `ArticleRO`.

On the `controller` level, we can simply either add `@Serialize(UserDto)` on class level or method level.
Then everything is working fine as expected.

#### Method Level
```ts
import { UserDto } from './dto/user.dto';
import { Serialize } from './interceptors/serialize.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Serialize(UserDto) // adding this
  getAllUsers(): UserDto[] {
    return this.appService.findAll();
  }

  @Get('/:index')
  getOneUser(@Param('index') index: number): UserDto {
    const users = this.appService.findAll();
    return users[index];
  }
}


```

#### Class Level
```ts
import { UserDto } from './dto/user.dto';
import { Serialize } from './interceptors/serialize.interceptor';

@Controller()
@Serialize(UserDto) // adding this
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllUsers(): UserDto[] {
    return this.appService.findAll();
  }

  @Get('/:index')
  getOneUser(@Param('index') index: number): UserDto {
    const users = this.appService.findAll();
    return users[index];
  }
}


```

- Even the `1-to-many` relationship.

In `user.dto.ts`, just add `@Type(() => ArticleDto)` on top of `articles`.

```ts
import { Expose, Type } from 'class-transformer';
import 'reflect-metadata';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  @Type(() => ArticleDto) // adding this
  articles?: ArticleDto[];
}

```