// // Source - https://stackoverflow.com/questions/76308716/how-to-set-up-a-redisservice-using-redis-from-ioredis
// // Posted by Laszlo Sarvold
// // Retrieved 2025-11-07, License - CC BY-SA 4.0

// import { Test, TestingModule } from '@nestjs/testing';

// import Redis from 'ioredis';
// import redisMock from 'ioredis-mock';

// import { IoredisService } from './ioredis.service';
// import { REDIS_CLIENT } from './ioredis.constants';

// describe('IoredisService', () => {
//   let service: IoredisService;
//   let redisClientMock: Redis;

//   beforeEach(async () => {
//     redisClientMock = new redisMock();

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         IoredisService,
//         {
//           provide: REDIS_CLIENT,
//           useValue: redisClientMock,
//         },
//       ],
//     }).compile();

//     service = module.get<IoredisService>(IoredisService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('should set a key-value pair with expiration', async () => {
//     await service.set('test-key', 'test-value', 60);
//     const value = await service.get('test-key');
//     expect(value).toBe('test-value');
//   });

//   it('should get a value by key', async () => {
//     await redisClientMock.set('test-key', 'test-value');
//     const value = await service.get('test-key');
//     expect(value).toBe('test-value');
//   });

//   it('should return null for non-existent key', async () => {
//     const value = await service.get('non-existent-key');
//     expect(value).toBeNull();
//   });
// });
