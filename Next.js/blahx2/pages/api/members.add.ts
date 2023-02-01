import { NextApiRequest, NextApiResponse } from 'next';
import MemberCtrl from '@/controllers/member.ctrl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const supportMethod = ['POST'];
  try {
    if (supportMethod.indexOf(method!) === -1) {
      // 에러 반환
    }

    await MemberCtrl.add(req, res);
  } catch (err) {
    console.error(err);
  }
}
