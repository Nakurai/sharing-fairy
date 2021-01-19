<template>
  <div class="w3-container terms">
    <h2>Terms of use, Privacy</h2>
    <p>
      This website aims at making sharing files easier for all. However, as for
      everything, you should only use it if you understand how it works. The
      author does not endorse any responsability whatsoever.<br />
      Clicking the button below means you understand, agree, and accept.
    </p>
    <p>
      This website does not store anything on a third party service or any
      server. It does not use cookies. <br />
      Your files are encrypted and going straight from your device to the
      recipients'.
    </p>
    <p>
      For any additional questions, you can send an email here:
      <a href="mailto:contact@nakuraicodes.com">contact@nakuraicodes.com</a>
    </p>
    <span class="w3-btn w3-green-action pointer" @click="$emit('save')"
      >I understand, agree, and accept</span
    >
  </div>
</template>

<script>
export default {
  name: "TermsOfUse",
  emits: ["save"],
};
</script>

<style>
.terms {
  padding-bottom: 20px;
}
</style>
