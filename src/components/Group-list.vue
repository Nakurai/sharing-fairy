<template>
  <div class="w3-container">
    <h3>Your groups</h3>
    <p>
      Select a group to connect to it.
    </p>
    <div v-for="g in groups" :key="g.pin" class="w3-container">
      <div
        class="w3-row group-item"
        :class="g.groupName === currentGroupName ? 'w3-green' : ''"
      >
        <div
          class="w3-col s6"
          @click="switchGroup(g.id)"
          :class="g.groupName === currentGroupName ? '' : 'pointer'"
        >
          {{ g.groupName }}
          <br />
          pin:{{ g.pin }}
        </div>
        <div class="w3-col s6">
          <button @click="deleteGroup(g.id)">delete</button>
        </div>
      </div>
    </div>

    <p>
      <span class="w3-btn w3-green-action pointer" @click="$emit('addgroup')"
        >Add a group</span
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "GroupList",
  props: {
    groups: Array,
    currentGroupName: String,
  },
  emits: ["addgroup", "deletegroup", "switchgroup"],
  methods: {
    deleteGroup(id) {
      this.$emit("deletegroup", id);
    },
    switchGroup(id) {
      console.log("switch to ", id);
      this.$emit("switchgroup", id);
    },
  },
};
</script>

<style>
.group-item {
  border: 1px solid black;
  margin-bottom: 5px;
  padding: 5px;
}
</style>
