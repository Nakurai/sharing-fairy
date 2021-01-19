<template>
  <header-bar
    :appname="$store.state.app.name"
    :group="{
      username: $store.state.groups.username,
      pin: $store.state.groups.pin,
      groupName: $store.state.groups.groupName,
    }"
    :groups="groupList"
    @addgroup="addGroup"
    @deletegroup="deleteGroup"
    @switchgroup="switchGroup"
  />
  <div v-if="$store.state.app.fatalError" class="app-view w3-text-red">
    {{ $store.state.app.fatalError }}
  </div>
  <div v-else>
    <router-view />
    <footer class="w3-container w3-bottom app-footer">
      <nav-button
        path="/send"
        label="Send"
        :isActive="['/send', '/'].includes(activeRoute)"
      />
      <nav-button
        path="/receive"
        label="Receive"
        :isActive="'/receive' === activeRoute"
      />
      <nav-button
        path="/peers"
        :label="'Peers (' + Object.keys($store.state.peers.peers).length + ')'"
        :isActive="'/peers' === activeRoute"
      />
    </footer>
    <div
      class="w3-modal"
      :class="showSettingForm ? 'displayBlock' : 'displayNone'"
    >
      <div class="w3-modal-content">
        <terms-of-use v-if="step === 'tos'" @save="save" />
        <setting-form
          v-else
          :username="$store.state.groups.username"
          :groupName="$store.state.groups.groupName"
          @save-settings="save"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NavButton from "@/components/Navigation-button";
import HeaderBar from "@/components/Header-bar";
import SettingForm from "@/components/Setting-form";
import TermsOfUse from "@/components/Terms-of-use";
import pseudoRandomId from "@/utils/pseudo-random-id";
import { mapGetters } from "vuex";
export default {
  name: "App",
  props: {},
  components: {
    "nav-button": NavButton,
    "setting-form": SettingForm,
    "terms-of-use": TermsOfUse,
    "header-bar": HeaderBar,
  },
  data() {
    return {
      showSettingForm: true,
      step: "tos",
    };
  },
  computed: {
    activeRoute() {
      return this.$route.path;
    },
    ...mapGetters({
      groupList: "groups/groupList",
    }),
  },
  async created() {
    try {
      await this.$store.dispatch("app/initApp");
      if (this.$store.state.app.termsOfUseAccepted) {
        this.step = "settings";
      }
      if (Object.keys(this.$store.state.groups.savedGroups).length > 0) {
        this.showSettingForm = false;
      }
    } catch (error) {
      console.error(error.message);
    }
  },
  beforeUnmount() {
    try {
      this.$store.dispatch("app/cleanApp");
    } catch (error) {
      console.error(error.message);
    }
  },
  methods: {
    save(settings) {
      try {
        if (this.step === "tos") {
          this.$store.commit("app/acceptTos");
          this.step = "settings";
        } else {
          // if the user is creating a new group, we have to generate a new pin for it
          if (!settings.pin) {
            const newPin = pseudoRandomId(5);
            settings.pin = newPin;
          }
          this.$store.dispatch("groups/addAndSwitchToGroup", settings);
          this.showSettingForm = false;
        }
      } catch (error) {
        console.log("ERROR ", error.message);
      }
    },
    addGroup() {
      this.showSettingForm = true;
    },
    deleteGroup(id) {
      this.$store.dispatch("groups/deleteGroup", id);
    },
    switchGroup(id) {
      console.log("in app.vue switch to ", id);
      this.$store.dispatch("groups/switchGroup", id);
    },
  },
};
</script>

<style>
.app-header {
  height: 80px;
}
.app-footer {
  min-height: 15vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
