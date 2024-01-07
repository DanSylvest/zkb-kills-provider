import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import nconf from 'nconf';
import { systems } from './core/systems';

const setupConfig = () => {
  nconf.argv().env().file('project.config.json');

  nconf.defaults({
    port: 2001,
  });
};

async function bootstrap() {
  setupConfig();
  const port = nconf.get('port');
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Start listening on port ${port}`);

  initSystems();

}

async function initSystems() {
  systems.init();
}

bootstrap();
