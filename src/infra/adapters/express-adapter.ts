import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

type Response = {
  status: number;
  data?: Record<string, unknown>;
};

export interface Controller<T = any> {
  execute: (input: T) => Promise<Response>;
}

export class ExpressAdapter {
  constructor(private readonly controller: Controller) {}

  adapt = async (req: ExpressRequest, res: ExpressResponse) => {
    const input = { ...req.body, ...req.query, ...req.params };
    const { status, data } = await this.controller.execute(input);

    if (!data) return res.sendStatus(status);
    res.status(status).json(data);
  };
}
