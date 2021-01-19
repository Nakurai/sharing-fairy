<template>
  <header class="w3-top w3-container w3-green app-header w3-bar">
    <div class="w3-left">
      <h3>{{ appname }}</h3>
      {{ group.username }}
    </div>
    <div class="w3-bar-item w3-right">
      <span
        class="w3-btn w3-green-action w3-small"
        @click="showGroupList = true"
      >
        {{ group.groupName }} <br />
        pin: {{ group.pin }}
      </span>
      <br />
    </div>
  </header>
  <div class="w3-modal" :class="showGroupList ? 'displayBlock' : 'displayNone'">
    <div class="w3-modal-content">
      <div class="w3-bar">
        <i
          class="w3-right material-icons pointer w3-xxlarge"
          @click="showGroupList = false"
          >close</i
        >
      </div>
      <group-list
        :groups="groups"
        @addgroup="onAdd"
        @deletegroup="onDelete"
        @switchgroup="onSwitch"
        :currentGroupName="group.groupName"
      />
    </div>
  </div>
</template>

<script>
import GroupList from "@/components/Group-list";
export default {
  name: "Header",
  props: {
    appname: String,
    group: Object,
    groups: Array,
  },
  emits: ["addgroup", "deletegroup", "switchgroup"],
  components: {
    "group-list": GroupList,
  },
  data() {
    return {
      showGroupList: false,
    };
  },
  methods: {
    onAdd() {
      this.$emit("addgroup");
      this.showGroupList = false;
    },
    onDelete(id) {
      this.$emit("deletegroup", id);
    },
    onSwitch(id) {
      console.log("in header switch to ", id);
      this.$emit("switchgroup", id);
    },
  },
};
</script>
