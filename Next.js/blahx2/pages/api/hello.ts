// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import FirebaseAdmin from '@/models/firebase_admin';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  FirebaseAdmin.getInstance().Firebase.collection('test');
  res.status(200).json({ name: 'John Doe' });
}
