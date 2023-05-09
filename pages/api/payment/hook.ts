// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import {requestHandler} from '../apiHelper';

const handlePortOneWebhook = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  /**
   * tx_id: 결제 트랜잭션 ID
   * payment_id: 주문 ID
   * status: 결제 상태
   */
  console.log('hook body', req.body);
  res.status(200).json({});
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await requestHandler(req, res, {
    post: () => handlePortOneWebhook(req, res),
  });
}
