import * as express from 'express';
import * as routingConfigurator from '../routingConfigurator';
import helloWorld from './controllers/helloWorld.controller';

routingConfigurator.processConfig((app: express.Express) => {
  app.get('/', helloWorld);
  app.get('/:name', helloWorld);
});
