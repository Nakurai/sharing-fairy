import { FILE_STATUS } from "../utils/constants";

export default {
  namespaced: true,
  state: () => ({
    toSend: [],
    received: [],
  }),
  mutations: {
    setFilesToShare(state, fileList) {
      state.files = [];
      for (let fileIndex = 0; fileIndex < fileList.length; fileIndex++) {
        const f = fileList[fileIndex];
        state.toSend[fileIndex] = {
          status: FILE_STATUS.TO_BE_SENT,
          mdnfile: f,
          name: f.name,
          size: f.size,
        };
      }
    },
    receiveFile(state, fileInfo) {
      try {
        state.received.push({ status: FILE_STATUS.RECEIVED, ...fileInfo });
      } catch (error) {
        console.log("ERROR ", error.message);
      }
    },
    setStatusToDownloaded(state, fileIndex) {
      try {
        state.received[fileIndex].status = FILE_STATUS.DOWNLOADED;
      } catch (error) {
        console.log("ERROR ", error.message);
      }
    },
    cleanup(context) {
      context.state.toSend = [];
      context.state.toReceive = [];
    },
  },
  actions: {
    sendFiles(context) {
      try {
        for (
          let fileIndex = 0;
          fileIndex < context.state.toSend.length;
          fileIndex++
        ) {
          let currentFile = context.state.toSend[fileIndex];
          const reader = new FileReader();
          reader.addEventListener(
            "load",
            () => {
              try {
                this.info =
                  "just before sending the file length " + reader.result.length;
                const info = { name: currentFile.name, binary: reader.result };
                context.dispatch("peers/sendFile", JSON.stringify(info), {
                  root: true,
                });
                currentFile.status = FILE_STATUS.SENT;
                this.info = "file sent !";
              } catch (error) {
                currentFile.status = FILE_STATUS.ERROR;
              }
            },
            false
          );

          reader.readAsDataURL(context.state.toSend[fileIndex].mdnfile);
        }
      } catch (error) {
        console.log("ERROR ", error.message);
      }
    },
  },
  getters: {},
};
