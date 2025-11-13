import { AppBootstrap } from './infrastructures/bootstrap/app-boostrap';

async function bootstrap() {
  const appBootstrap = new AppBootstrap();
  await appBootstrap.bootstrap();
  await appBootstrap.listen();
}

void bootstrap();
