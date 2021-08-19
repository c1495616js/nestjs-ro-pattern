import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './dto/user.dto';
import { Serialize } from './interceptors/serialize.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Serialize(UserDto)
  getAllUsers(): UserDto[] {
    return this.appService.findAll();
  }

  @Get('/:index')
  @Serialize(UserDto)
  getOneUser(@Param('index') index: number): UserDto {
    const users = this.appService.findAll();
    return users[index];
  }

}
