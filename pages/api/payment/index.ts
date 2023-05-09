// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import {requestHandler} from '../apiHelper';
import {FakeORM} from './fakeData';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await requestHandler(req, res, {
    get: () => {
      FakeORM.OrderService.create(req.query.productId as string, 1000);
      res.status(200).json({
        paymentId: req.query.productId,
        amount: 1000,
        productName: '나이키 와플 트레이너 2 SD',
        taxFreeAmount: 300,
      });
    },
  });
}
