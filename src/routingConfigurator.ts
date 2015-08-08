import * as express from 'express';

let app = express();

export interface RouterConfig {
  (app: express.Express): void;
}

export function processConfig(config: RouterConfig) {
  config(app);
}

export default app;
