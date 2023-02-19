import { NextApiRequest, NextApiResponse } from 'next';
import CustomServerError from '@/controllers/error/custom_server_error';
import MessageModel from '@/models/message/message.model';
import BadReqError from './error/bad_request_error';
import FirebaseAdmin from '@/models/firebase_admin';

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

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { uid, messageId } = req.query;
  if (uid === undefined) {
    throw new BadReqError('uid 누락');
  }
  if (messageId === undefined) {
    throw new BadReqError('messageId 누락');
  }
  const uidToStr = Array.isArray(uid) ? uid[0] : uid;
  const messageIdToStr = Array.isArray(messageId) ? messageId[0] : messageId;
  const data = await MessageModel.get({ uid: uidToStr, messageId: messageIdToStr });
  return res.status(200).json(data);
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

async function updateMessage(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization;
  if (token === undefined) {
    throw new CustomServerError({ statusCode: 401, message: '권한이 없습니다.' });
  }
  let tokenUid: null | string = null;
  try {
    const decode = await FirebaseAdmin.getInstance().Auth.verifyIdToken(token);
    tokenUid = decode.uid;
  } catch (err) {
    throw new BadReqError('token에 문제가 있습니다.');
  }
  const { uid, messageId, deny } = req.body;
  if (uid === undefined) {
    throw new BadReqError('uid 누락');
  }
  if (uid !== tokenUid) {
    throw new CustomServerError({ statusCode: 401, message: '수정 권한이 없습니다.' });
  }
  if (messageId === undefined) {
    throw new BadReqError('messageId 누락');
  }
  if (deny === undefined) {
    throw new BadReqError('deny 누락');
  }
  const result = await MessageModel.updateMessage({ uid, messageId, deny });
  return res.status(200).json(result);
}

async function list(req: NextApiRequest, res: NextApiResponse) {
  const { uid, page = '1', size = '10' } = req.query;
  if (uid === undefined) {
    throw new BadReqError('uid 누락');
  }
  const uidToStr = Array.isArray(uid) ? uid[0] : uid;
  const pageToStr = Array.isArray(page) ? page[0] : page;
  const sizeToStr = Array.isArray(size) ? size[0] : size;
  const listRes = await MessageModel.listWithPage({
    uid: uidToStr,
    page: parseInt(pageToStr, 10),
    size: parseInt(sizeToStr, 10),
  });
  return res.status(200).json(listRes);
}

const MessageCtrl = {
  post,
  get,
  postReply,
  updateMessage,
  list,
};

export default MessageCtrl;
