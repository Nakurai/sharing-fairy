<template>
  <div class="w3-container setting-modal">
    <h2>Settings</h2>
    <p>
      <label
        >Change your current username if you want to (pick one that people would
        recognize)
      </label>
      <br />
      <input type="text" v-model="usernameInput" />
    </p>
    <p>
      Are you joining an existing group or creating one? <br />
      <span
        class="w3-btn pointer w3-small"
        :class="mode === MODE_VALUE.JOIN ? 'w3-green' : 'w3-green-action'"
        @click="
          () => {
            mode = MODE_VALUE.JOIN;
          }
        "
        >Join</span
      >
      &nbsp;
      <span
        class="w3-btn pointer w3-small"
        :class="mode === MODE_VALUE.CREATE ? 'w3-green' : 'w3-green-action'"
        @click="
          () => {
            mode = MODE_VALUE.CREATE;
          }
        "
        >Create</span
      >
    </p>
    <div v-if="mode !== null">
      <p>
        <label>
          {{ groupNameLabel }}
        </label>
        <br />
        <input type="text" v-model="groupNameInput" />
        <span
          v-if="mode === MODE_VALUE.CREATE"
          class="character-number"
          :class="groupNameInput.length > 12 ? 'w3-text-green' : 'w3-text-red'"
          >{{ groupNameInput.length }}/12</span
        >
      </p>
      <p v-if="mode === MODE_VALUE.JOIN">
        <label>Please enter its PIN number here: </label>
        <br />
        <input type="number" v-model="pinInput" />
      </p>
      <span class="w3-btn w3-green-action pointer" @click="save">Save</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingModal",
  props: {
    username: String,
    groupName: String,
  },
  emits: ["saveSettings"],
  data() {
    return {
      usernameInput: this.username,
      pinInput: null,
      groupNameInput: this.groupName,
      userIsjoiningANetwork: false,
      mode: null,
      MODE_VALUE: {
        CREATE: "CREATE",
        JOIN: "JOIN",
      },
    };
  },
  computed: {
    groupNameLabel() {
      let res = "Great! Pick your group name (min:12c):";
      if (this.mode === this.MODE_VALUE.JOIN) {
        res = "Enter the group's name provided to you here:";
      }
      return res;
    },
    formIsOkay() {
      let usernameOk = false;
      if (this.usernameInput) {
        usernameOk = true;
      }
      let groupNameOk = false;
      if (this.groupNameInput && this.groupNameInput.length > 12) {
        groupNameOk = true;
      }
      let pinOk = false;
      if (
        this.mode === this.MODE_VALUE.CREATE ||
        (this.mode === this.MODE_VALUE.JOIN && this.pinInput)
      ) {
        pinOk = true;
      }
      return usernameOk && groupNameOk && pinOk;
    },
  },
  methods: {
    save() {
      if (this.formIsOkay) {
        this.$emit("saveSettings", {
          username: this.usernameInput,
          pin: this.pinInput,
          groupName: this.groupNameInput,
        });
      }
    },
  },
};
</script>

<style>
.setting-modal {
  padding-bottom: 20px;
}
.character-number {
  font-size: 9px;
}
</style>
