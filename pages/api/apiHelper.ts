import _ from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';

type RequestHandlerOptionProps = {
  get?: () => void;
  post?: () => void;
  put?: () => void;
  delete?: () => void;
};

export const requestHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  options?: RequestHandlerOptionProps,
) => {
  const method = _.lowerCase(req.method) as 'get' | 'post' | 'put' | 'delete';
  if (options && options[method]) {
    await options[method]!();
  } else {
    res.status(404).end();
  }
};
