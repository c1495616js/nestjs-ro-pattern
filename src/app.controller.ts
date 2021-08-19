import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './dto/user.dto';
import { Serialize } from './interceptors/serialize.interceptor';
// import { UserDto } from './dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Serialize(UserDto)
  getAllUsers(): UserDto[] {
    return this.appService.findAll();
  }

  @Get('/one')
  @Serialize(UserDto)
  getOneUser(): UserDto {
    const users = this.appService.findAll();
    return users[0];
  }
}
