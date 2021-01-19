<template>
  <div class="app-view w3-center">
    <div class="file-picker" v-if="$store.state.files.toSend.length === 0">
      <span
        @click="openFileSelector"
        class="w3-btn w3-xxlarge w3-center w3-green-action"
        >Pick files</span
      >
      <input
        type="file"
        id="fileSelector"
        @change="updateFileList"
        hidden
        multiple
      />
    </div>
    <div v-else>
      <ul class="file-list">
        <li
          class="file-list-item"
          v-for="f in $store.state.files.toSend"
          :key="f.name"
        >
          {{ f.name }}
          <span class="w3-right">
            <i class="material-icons" v-if="f.status === fileStatus.TO_BE_SENT"
              >hourglass_empty</i
            >
            <i
              class="material-icons w3-text-green"
              v-else-if="f.status === fileStatus.SENT"
              >done</i
            >
            <i class="material-icons w3-text-red" v-else>error</i>
          </span>
        </li>
      </ul>
      <span
        v-if="Object.values($store.state.peers.peersInfo).length === 0"
        class="w3-btn w3-green-action w3-disabled"
        @click="sendFiles"
        >No Connected Peers</span
      >
      <span v-else class="w3-btn w3-green-action" @click="sendFiles"
        >Send to {{ $store.state.peers.selected.length || "All" }} Peers</span
      >
      <!-- or <router-link to="/peers">Select Peers</router-link> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { FILE_STATUS } from "@/utils/constants.js";
export default {
  name: "Send",
  data() {
    return {
      fileSelector: null,
      fileStatus: FILE_STATUS,
    };
  },
  mounted() {
    this.fileSelector = document.querySelector("#fileSelector");
  },
  methods: {
    openFileSelector() {
      this.fileSelector.click();
    },
    updateFileList() {
      const selectedFiles = this.fileSelector.files;
      this.$store.commit("files/setFilesToShare", selectedFiles);
    },
    sendFiles() {
      if (Object.values(this.$store.state.peers.peersInfo).length > 0) {
        this.$store.dispatch("files/sendFiles");
      }
    },
  },
};
</script>

<style>
.file-picker {
  margin-top: 100px;
}
.file-list {
  height: 55vh;
  overflow-y: scroll;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  list-style-type: none;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 16px;
}
.file-list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
