import * as express from 'express';

export default (req: express.Request, res: express.Response) => {
  let name = req.params.name || 'World';

  res.end(`Hello ${name}`);
}
