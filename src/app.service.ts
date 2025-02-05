import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Server started on port = 5000';
  }

  getFoods() {
    return [
      { id: 1, name: 'Pizza' },
      { id: 2, name: 'Burger' },
    ];
  }
}
