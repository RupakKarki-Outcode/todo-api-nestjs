import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('App Module Test', () => {
    it('should return true', () => {
      expect(appController.getApiStatus().status).toBeTruthy();
    });
  });
});
