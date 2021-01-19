import P2PT from "p2pt";
import { ANNOUCE_URLS, MSG_TYPE, APP_ID } from "../utils/constants";
export default {
  namespaced: true,
  state: () => ({
    peers: {},
    peersInfo: {},
    connection: null,
    selected: [],
  }),
  mutations: {
    connectPeer(state) {
      try {
        if (state.connection) {
          state.connection.start();
        } else {
          throw new Error("no p2pt instance");
        }
      } catch (error) {
        console.log("ERROR ", error.message);
      }
    },
    setPeerInfo(state) {
      try {
        if (state.connection) {
          state.connection.start();
        } else {
          throw new Error("no p2pt instance");
        }
      } catch (error) {
        console.log("ERROR ", error.message);
      }
    },
  },
  actions: {
    sendFile(context, fileInfo) {
      try {
        if (typeof fileInfo !== "string") {
          fileInfo = JSON.stringify(fileInfo);
        }
        let recipients = context.state.selected;
        if (recipients.length === 0) {
          recipients = Object.keys(context.state.peers);
        }
        for (
          let recipientIndex = 0;
          recipientIndex < recipients.length;
          recipientIndex++
        ) {
          const recipientPeerId = recipients[recipientIndex];
          context.state.connection.send(context.state.peers[recipientPeerId], {
            type: MSG_TYPE.PROVIDE_FILE,
            data: fileInfo,
          });
        }
      } catch (error) {
        console.log("ERROR ", error.message);
      }
    },
    pingPeer(context, peerId) {
      if (context.state.peers[peerId]) {
        context.state.connection.send(context.state.peers[peerId], {
          type: MSG_TYPE.PING,
        });
      } else {
        console.log("ERROR peer id does not exist");
      }
    },
    createPeerConnection(context) {
      try {
        if (
          context.rootState.groups.pin &&
          context.rootState.groups.groupName
        ) {
          if (context.state.connection) {
            context.dispatch("cleanup");
          }
          const sessionId =
            APP_ID +
            ":" +
            context.rootState.groups.pin +
            ":" +
            context.rootState.groups.groupName;
          context.state.connection = new P2PT(ANNOUCE_URLS, sessionId);
          context.state.connection.on("peerconnect", (peer) => {
            console.log("new peer connected");
            // save peer's information
            context.state.peers[peer.id] = peer;
            context.state.peersInfo[peer.id] = { username: null };
            // ask for their username
            context.state.connection.send(peer, {
              type: MSG_TYPE.REQUEST_USERNAME,
            });
          });
          context.state.connection.on("msg", (peer, msg) => {
            try {
              switch (msg.type) {
                case MSG_TYPE.REQUEST_USERNAME:
                  context.state.connection.send(peer, {
                    type: MSG_TYPE.PROVIDE_USERNAME,
                    data: context.rootState.groups.username,
                  });
                  break;
                case MSG_TYPE.PROVIDE_USERNAME:
                  context.state.peersInfo[peer.id].username = msg.data;
                  break;
                case MSG_TYPE.PING:
                  context.state.connection.send(peer, {
                    type: MSG_TYPE.PONG,
                  });
                  break;
                case MSG_TYPE.PONG:
                  break;
                case MSG_TYPE.PROVIDE_FILE:
                  context.commit("files/receiveFile", JSON.parse(msg.data), {
                    root: true,
                  });
                  break;
                default:
                  msg = null;
                  break;
              }
            } catch (error) {
              console.log("ERROR ", error.message);
            }
          });
          context.state.connection.on("peerclose", (peer) => {
            console.log("peer closed ", peer.id);
            delete context.state.peers[peer.id];
          });
          context.state.connection.on("trackerconnect", () => {
            console.log("tracker connected ");
          });
          context.state.connection.on("trackerwarning", () => {
            console.log("tracker warning! ");
          });
        } else {
          throw new Error("no IP to create the connection");
        }
      } catch (error) {
        console.log("ERROR ", error.message);
      }
    },
    cleanup(context) {
      if (context.state.connection) {
        context.state.connection.destroy();
      }
      context.state.peers = {};
      context.state.connection = null;
    },
  },
  getters: {
    getPeerList(state) {
      return Object.values(state.peers);
    },
  },
};
