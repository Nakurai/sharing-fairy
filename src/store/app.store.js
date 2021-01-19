import { LOCAL_STORAGE_KEY } from "../utils/constants";

export default {
  namespaced: true,
  state: () => ({
    name: "Sharing Fairy",
    fatalError: null,
    version: "v1",
    termsOfUseAccepted: false,
  }),
  mutations: {
    initTos(state) {
      state.termsOfUseAccepted = localStorage.getItem(
        LOCAL_STORAGE_KEY.TOS_ACCEPTED
      );
    },
    acceptTos(state) {
      state.termsOfUseAccepted = true;
      localStorage.setItem(LOCAL_STORAGE_KEY.TOS_ACCEPTED, true);
    },
  },
  actions: {
    async initApp(context) {
      try {
        context.commit("initTos");
        context.dispatch("groups/initGroup", null, { root: true });
      } catch (error) {
        console.log("ERROR ", error.message);
      }
    },
    async cleanApp(context) {
      try {
        context.state.publicIp = null;
        context.dispatch("peers/cleanup", null, { root: true });
      } catch (error) {
        console.log("ERROR ", error.message);
      }
    },
  },
  getters: {},
};
