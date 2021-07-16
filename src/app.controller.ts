import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  find() {
    return 'hello world';
  }
}
