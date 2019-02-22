<template>
  <div id="appConteiner" @click="$emit('evenname', 10)">{{cip}}</div>
</template>

<script>
export default {
  name: "App",
  props: { cip: Number },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
</style>
