<template>
  <v-alert border="left" :type="type" dismissible>
    {{ Message }}
  </v-alert>
</template>

<script>
export default {
  name: "Alert",
  props: {
    type: null,
    Message: null,
  },
};
</script>

<style>
</style>