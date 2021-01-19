<template>
  <router-link
    :to="path"
    class="w3-btn w3-xlarge"
    :class="isActive ? 'w3-green' : 'w3-green-action'"
  >
    {{ label }}
  </router-link>
</template>

<script>
export default {
  name: "NavButton",
  props: {
    path: String,
    label: String,
    isActive: Boolean,
  },
};
</script>
