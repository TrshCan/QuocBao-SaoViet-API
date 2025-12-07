import { IoredisService } from '@/modules/shared/ioredis';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(private readonly redisService: IoredisService) {}
}
