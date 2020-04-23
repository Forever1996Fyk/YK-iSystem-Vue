/**
 * Created by YuKai Fan on 2020/4/22
 */
import config from '@/config'

const state = {
  webSocket: null,
};

const mutations = {
  /**
   * @return {boolean}
   */
  SOCKET_CHECK() {
    return !(state.webSocket != null
      && state.webSocket.readyState === WebSocket.OPEN);
  },
  /**
   * @return {boolean}
   */
  SOCKET_INIT(state) {
    if (window.WebSocket) {
      if (!mutations.SOCKET_CHECK) {
        return false;
      }
    }
    state.webSocket = new WebSocket(config.webSocketUrl.dev);
    state.webSocket.onopen = mutations.SOCKET_ONOPEN;
    state.webSocket.onclose = mutations.SOCKET_ONCLOSE;
    // state.webSocket.onmessage = mutations.SOCKET_ONMESSAGE;
    state.webSocket.onerror = mutations.SOCKET_ONERROR;
  },
  /**
   * 连接
   * @constructor
   *
   */
  SOCKET_ONOPEN() {
    console.log("连接建立....");
    //连接成功就发送一条连接消息
    console.log(config.action.CONNECT)
    var chatMessageContent = {
      action: config.action.CONNECT,
      msgType:  config.msgType.SINGLE_CHAT,
      senderId: localStorage.getItem('account'),
    };
    mutations.SOCKET_SEND(chatMessageContent);
    console.log("连接成功....");
  },
  /**
   * 告诉你消息
   * @param obj
   * @constructor
   */
  SOCKET_SEND(obj) {
    state.webSocket.send(JSON.stringify(obj));
  },

  SOCKET_ONCLOSE(e) {
    state.webSocket.close();
    console.log("连接关闭....");
  },

  SOCKET_ONERROR(e) {
    console.error("连接出错。。。");
  },
  SOCKET_ONMESSAGE(msg) {
    const data = JSON.parse(msg.data);
  }
};

const actions = {
  init({commit}) {
    commit('SOCKET_INIT');
  },
  send({commit}) {
    commit('SOCKET_SEND');
  },
  close({commit}) {
    commit('SOCKET_ONCLOSE');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
