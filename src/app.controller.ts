import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { UserDto } from './dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllUsers(): string {
    console.log(this.appService.findAll());
    return JSON.stringify(this.appService.findAll());
  }
}
