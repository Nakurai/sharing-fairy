<template>
  <div class="app-view">
    <h4>Connected Peers</h4>
    <div class="w3-container" v-if="peerList.length === 0">
      No one is connected yet. It should not take more than 45 seconds to
      display the other peers. Try refreshing the page if nothing happens.
    </div>
    <div v-else>
      <ul>
        <li v-for="p in peerList" :key="p.id" class="peer-list-item">
          {{ $store.state.peers.peersInfo[p.id].username || p.id }}
          <!-- <button
          @click="
            () => {
              ping(p.id);
            }
          "
        >
          ping
        </button> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Peer",
  computed: {
    ...mapGetters({
      peerList: "peers/getPeerList",
    }),
  },
  methods: {
    ping(peerId) {
      this.$store.dispatch("peers/pingPeer", peerId);
    },
    refresh() {
      console.log("refreshing peers ");
    },
  },
};
</script>

<style>
.peer-list-item {
}
</style>
