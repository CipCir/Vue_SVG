<template>
  <div id="PageContainer">
    <svg
      id="drawing"
      width="200px"
      height="200px"
      viewBox="0 0 500 500"
      style="border:1px solid black;"
    ></svg>
    <center>
      <button @click="animate_emoti(1)">X</button>
    </center>
  </div>
</template>
<script>
import SVG from "svg.js";
export default {
  data() {
    return {
      canvas: [],
      circle: [],
      mouth: [],
      radial1: "",
      //                      m224,325q0,0 0,0
      mouth_array_1: ["", "m225,325q0,0 50,0"],
      mouth_array_2: ["", "m225,325q0,0 150,0"],
      mouth_array_3: ["", "m225,325q0,0 250,0"]
    };
  },
  mounted() {
    this.canvas = SVG("drawing").viewbox(0, 0, 500, 500);
    this.circle = this.canvas.circle(300).move(0, 0);

    this.radial = this.canvas.gradient("radial", function(stop) {
      stop.at(0, "#f1da49");
      stop.at(0.9, "#f1ca49");
      stop.at(1, "#f1ba49");
    });
    this.mouth = this.canvas.path("").attr({
      fill: "none",
      stroke: "#000",
      "stroke-width": 15,
      "stroke-linecap": "round"
    });

    this.animate_emoti(1);
  },
  methods: {
    init(x) {
      this.circle.attr({ cx: 250, cy: 250, fill: this.radial });
      this.mouth.attr({ d: this.mouth_array_1[x] });
    },
    animate_emoti(x) {
      var dur = 500;
      var del = 0;

      this.init(x);

      this.circle
        .animate(dur, ">", del)
        .attr({ r: 250 })
        .animate(3 * dur, ">", del)
        .attr({ r: 250 })
        .animate(dur, "<>", del)
        .attr({ r: 150 });
      this.mouth
        .animate(0.5 * dur, ">", del)
        .attr({ d: this.mouth_array_1[x] })
        .animate(1 * dur, ">", del)
        .attr({ d: this.mouth_array_2[x] })
        .animate(1 * dur, "<>", del)
        .attr({ d: this.mouth_array_3[x] })
        .animate(1 * dur, ">", del)
        .attr({ d: this.mouth_array_2[x] })
        .animate(1 * dur, "<>", del)
        .attr({ d: this.mouth_array_3[x] })
        .animate(0.5 * dur, "<>", del)
        .attr({ d: this.mouth_array_1[x] });

      // this.circle
      //   .animate(dur, "<>", del)
      //   .attr({ r: 250 })
      //   .animate(dur, "<>", del * 2)
      //   .attr({ r: 150 });
      // this.mouth
      //   .animate((dur / 5) * 2, "<", del)
      //   .attr({ d: this.mouth_array_final[x] });
    }
  }
};
</script>
<style scoped>
</style>  