<template>
  <div id="PageContainer">Ramo
    <div id="drawing"></div>
  </div>
</template>
<script>
import SVG from "svg.js";
export default {
  mounted() {
    var draw = SVG("drawing").size(300, 300);
    var rect = draw.rect(100, 100).attr({ fill: "#f06" });
  }
};
</script>
<style scoped>
</style>  