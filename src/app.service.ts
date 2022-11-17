import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService<ConfigType>) {}

  getApiStatus() {
    return {
      status: true,
      apiVersion: this.configService.get('API_VERSION'),
    };
  }
}
