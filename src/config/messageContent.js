/**
 * Created by YuKai Fan on 2020/4/22
 */
module.exports = {
  action,
  msgType
}

const action = {
  CONNECT: 'connect',
  SEND: 'send',
  SIGNED: 'signed',
  KEEP_ALIVE: 'keep_alive',
}

const msgType = {
  SINGLE_CHAT: 'single_chat',
  GROUP_CHAT: 'group_chat',
  CHAT_ROOM: 'chat_room',
  SYSTEM_MESSAGE: 'system_message',
  NOTICE_MESSAGE: 'notice_message',
}

/**
 * 通用消息内容实体
 * @param action
 * @param msgType
 * @param msgContentType
 * @param content
 * @param extension
 * @constructor
 */
export function MessageContent(action, msgType, msgContentType, content, extension) {
  this.action = action;
  this.msgType = msgType;
  this.msgContentType = msgContentType;
  this.content = content;
  this.extension = extension;
}

/**
 * 聊天消息内容实体
 * @param senderId
 * @param receiverId
 * @param userName
 * @param receiverHeadPic
 * @param senderHeadPic
 * @constructor
 */
export function ChatMessageContent(senderId, receiverId, userName, receiverHeadPic, senderHeadPic) {
  this.senderId = senderId;
  this.receiverId = receiverId;
  this.userName = userName;
  this.receiverHeadPic = receiverHeadPic;
  this.senderHeadPic = senderHeadPic;
}

/**
 * 通知消息内容
 * @param noticeMsgType
 * @constructor
 */
export function NoticeMessageContent(noticeMsgType) {
  this.noticeMsgType = noticeMsgType;
}


export function Inherit(C, P) {
  C.prototype = new P();
}




