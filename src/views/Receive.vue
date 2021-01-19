<template>
  <div class="app-view">
    <div class="file-picker" v-if="$store.state.files.received.length === 0">
      No file received yet
    </div>
    <div v-else>
      <ul class="file-list">
        <li
          class="file-list-item"
          v-for="(f, index) in $store.state.files.received"
          :key="f.name"
        >
          {{ f.name }}
          <i
            class="material-icons w3-large pointer"
            v-if="f.status === fileStatus.RECEIVED"
            @click="
              () => {
                downloadFile(index);
              }
            "
          >
            get_app
          </i>
          <i
            class="material-icons w3-large w3-text-green"
            v-else-if="f.status === fileStatus.DOWNLOADED"
          >
            done
          </i>
          <i class="material-icons w3-large w3-text-red" v-else>
            error
          </i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { FILE_STATUS } from "@/utils/constants.js";
export default {
  name: "Receive",
  data() {
    return {
      fileStatus: FILE_STATUS,
    };
  },
  methods: {
    downloadFile(fileIndex) {
      try {
        const fileToDownload = this.$store.state.files.received[fileIndex];
        window.download(fileToDownload.binary, fileToDownload.name);
        this.$store.commit("files/setStatusToDownloaded", fileIndex);
      } catch (error) {
        console.log("ERROR ", error.message);
      }
    },
  },
};
</script>

<style>
.file-list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
