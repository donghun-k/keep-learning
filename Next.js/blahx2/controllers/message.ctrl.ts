import { NextApiRequest, NextApiResponse } from 'next';
import MessageModel from '@/models/message/message.model';
import BadReqError from './error/bad_request_error';

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { uid, message, author } = req.body;
  if (uid === undefined) {
    throw new BadReqError('uid 누락');
  }
  if (message === undefined) {
    throw new BadReqError('message 누락');
  }
  await MessageModel.post({ uid, message, author });
  return res.status(201).end();
}

async function postReply(req: NextApiRequest, res: NextApiResponse) {
  const { uid, messageId, reply, author } = req.body;
  if (uid === undefined) {
    throw new BadReqError('uid 누락');
  }
  if (messageId === undefined) {
    throw new BadReqError('messageId 누락');
  }
  if (reply === undefined) {
    throw new BadReqError('reply 누락');
  }
  await MessageModel.postReply({ uid, messageId, reply });
  return res.status(201).end();
}

async function list(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = req.query;
  if (uid === undefined) {
    throw new BadReqError('uid 누락');
  }
  const uidToStr = Array.isArray(uid) ? uid[0] : uid;
  const listRes = await MessageModel.list({ uid: uidToStr });
  return res.status(200).json(listRes);
}

const MessageCtrl = {
  post,
  postReply,
  list,
};

export default MessageCtrl;
