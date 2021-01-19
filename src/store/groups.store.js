import { LOCAL_STORAGE_KEY } from "../utils/constants";
import pseudoRandomId from "../utils/pseudo-random-id";

export default {
  namespaced: true,
  state: () => ({
    pin: null,
    groupName: "",
    username: null,
    savedGroups: {},
  }),
  mutations: {
    initUsername(state) {
      const previouslyStoredUsername = localStorage.getItem(
        LOCAL_STORAGE_KEY.USERNAME
      );
      if (previouslyStoredUsername) {
        state.username = previouslyStoredUsername;
      } else {
        const pseudoRandomUsername = "Anonymous-" + pseudoRandomId(5);
        state.username = pseudoRandomUsername;
        localStorage.setItem(LOCAL_STORAGE_KEY.USERNAME, pseudoRandomUsername);
      }
    },
    setUsername(state, username) {
      state.username = username;
      localStorage.setItem(LOCAL_STORAGE_KEY.USERNAME, username);
    },
    initPin(state) {
      const previouslyStoredPin = localStorage.getItem(LOCAL_STORAGE_KEY.PIN);
      if (previouslyStoredPin) {
        state.pin = previouslyStoredPin;
      }
    },
    setPin(state, pin) {
      state.pin = pin;
      localStorage.setItem(LOCAL_STORAGE_KEY.PIN, pin);
    },
    initGroupName(state) {
      const previouslyStoredGroupName = localStorage.getItem(
        LOCAL_STORAGE_KEY.GROUP_NAME
      );
      if (previouslyStoredGroupName) {
        state.groupName = previouslyStoredGroupName;
      }
    },
    initSavedGroup(state) {
      const previouslyStoredSavedGroup = localStorage.getItem(
        LOCAL_STORAGE_KEY.GROUP_SAVED
      );
      if (previouslyStoredSavedGroup) {
        state.savedGroups = JSON.parse(previouslyStoredSavedGroup);
      }
    },
    setGroupName(state, name) {
      if (name.length > 12) {
        state.groupName = name;
        localStorage.setItem(LOCAL_STORAGE_KEY.GROUP_NAME, name);
      } else {
        throw new Error("group name does not have enough characters");
      }
    },
    resetGroupInfo(state) {
      state.groupName = "";
      state.pin = "";
    },
    addGroup(state, groupInfo) {
      try {
        // check if their is already a group with the same name and pin
        let existingGroup = null;
        const groupList = Object.values(state.savedGroups);
        for (let gIndex = 0; gIndex < groupList.length; gIndex++) {
          const g = groupList[gIndex];
          if (g.groupName === groupInfo.groupName) {
            existingGroup = g;
            gIndex = state.savedGroups.length;
          }
        }

        if (existingGroup) {
          throw new Error(
            groupInfo.groupName + ":" + groupInfo.pin + " already exists"
          );
        } else {
          const groupId = pseudoRandomId(7);
          state.savedGroups[groupId] = { id: groupId, ...groupInfo };
          const currentState = "" + JSON.stringify(state.savedGroups);
          localStorage.setItem(LOCAL_STORAGE_KEY.GROUP_SAVED, currentState);
        }
      } catch (error) {
        console.log("ERROR ", error.message);
      }
    },
  },
  actions: {
    initGroup(context) {
      try {
        context.commit("initSavedGroup");
        context.commit("initUsername");
        context.commit("initPin");
        context.commit("initGroupName");
        if (context.state.groupName && context.state.pin) {
          context.dispatch("peers/createPeerConnection", null, { root: true });
          context.commit("peers/connectPeer", null, { root: true });
        }
      } catch (error) {
        console.log("ERROR ", error.message);
      }
    },
    addAndSwitchToGroup(context, groupInfo) {
      try {
        context.commit("addGroup", groupInfo);
        context.commit("setGroupName", groupInfo.groupName);
        context.commit("setPin", groupInfo.pin);
        context.commit("setUsername", groupInfo.username);
        context.dispatch("peers/createPeerConnection", null, { root: true });
        context.commit("peers/connectPeer", null, { root: true });
      } catch (error) {
        console.log("ERROR ", error.message);
      }
    },
    deleteGroup(context, groupId) {
      try {
        const groupInfo = context.state.savedGroups[groupId];
        // closing the connection if it is the current one
        if (groupInfo.groupName === context.state.groupName) {
          context.dispatch("peers/cleanup", null, { root: true });
          context.commit("resetGroupInfo");
        }
        delete context.state.savedGroups[groupId];
        const currentState = "" + JSON.stringify(context.state.savedGroups);
        localStorage.setItem(LOCAL_STORAGE_KEY.GROUP_SAVED, currentState);
      } catch (error) {
        console.log("ERROR ", error.message);
      }
    },
    switchGroup(context, groupId) {
      try {
        const groupInfo = context.state.savedGroups[groupId];
        console.log("switch group ", groupInfo);
        context.commit("setGroupName", groupInfo.groupName);
        context.commit("setPin", groupInfo.pin);
        context.commit("setUsername", groupInfo.username);
        context.dispatch("peers/cleanup", null, { root: true });
        context.dispatch("peers/createPeerConnection", null, { root: true });
        context.commit("peers/connectPeer", null, { root: true });
        // closing the connection if it is the current one
      } catch (error) {
        console.log("ERROR ", error.message);
      }
    },
  },
  getters: {
    groupList(state) {
      return Object.values(state.savedGroups);
    },
    currentGroup(state) {
      return {
        groupName: state.groupName,
        pin: state.pin,
        username: state.username,
      };
    },
  },
};
