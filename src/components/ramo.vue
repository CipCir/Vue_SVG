<template>
  <div id="PageContainer">
    <svg
      id="drawing"
      width="500px"
      height="500px"
      viewBox="0 0 500 500"
      style="border:1px solid black;"
    ></svg>
    <center>
      <div id="button1" @click="change_face(1)">B1</div>
      <div id="button2" @click="change_face(2)">B2</div>
      <div id="button3" @click="change_face(3)">B3</div>
      <div id="button4" @click="change_face(4)">B4</div>
      <div id="button5" @click="change_face(5)">B5</div>
    </center>
  </div>
</template>
<script>
import SVG from "svg.js";
export default {
  data() {
    return {
      canvas: "",
      circle1: "",
      eye1: "",
      eye2: "",
      mouth: "",
      eyeb1: "",
      eyeb2: ""
    };
  },
  mounted() {
    this.canvas = SVG("drawing").viewbox(0, 0, 500, 500);
    this.circle1 = this.canvas.circle(500).move(0, 0);
    this.eye1 = this.canvas.circle(70).move(110, 200);
    this.eye2 = this.canvas.circle(70).move(320, 200);
    this.mouth = this.canvas
      .path("m180,360q67,48 143,0")
      .fill("none")
      .attr({
        fill: "none",
        stroke: "#000",
        "stroke-width": 23,
        "stroke-linecap": "round"
      });
    this.eyeb1 = this.canvas
      .path("m105,194q42,-28 77,0")
      .fill("none")
      .attr({
        fill: "none",
        stroke: "#000",
        "stroke-width": 18,
        "stroke-linecap": "round"
      });
    this.eyeb2 = this.canvas
      .path("m315,194q42,-28 77,0")
      .fill("none")
      .attr({
        fill: "none",
        stroke: "#000",
        "stroke-width": 18,
        "stroke-linecap": "round"
      });
    // path1 = canvas.path("M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"
    //   );
    var radial = this.canvas.gradient("radial", function(stop) {
      stop.at(0, "#ffe53b");
      stop.at(1, "#ffce19");
    });

    this.circle1.fill(radial);

    //this.emoti1();
  },
  methods: {
    change_face(x) {
      var dur = 1000;
      var del = "0.1s";
      console.log(x);

      var d1 = "",
        w1 = ""; //mouth
      switch (x) {
        case 1:
          d1 = "m151.75,382.5q64.50667,-12.5 118,0";
          w1 = "31";
          break;
        case 2:
          d1 = "m160,390q71.06667,-59 130,0";
          w1 = "23";
          break;
        case 3:
          d1 = "m180,360q67,48 143,0";
          w1 = "23";
          break;
        case 4:
          d1 = "m160,343q82.87037,104 179,0";
          w1 = "23";
          break;
        case 5:
          d1 = "m202,243q61.29033,111.19231 190,49.18121";
          w1 = "23";
          break;
      }
      //   console.log(d1);
      this.mouth.animate(dur, "<", del).attr({ d: d1, "stroke-width": w1 });
    },
    emoti1() {
      var cx1 = this.eye1.attr("cx");
      var cx2 = this.eye2.attr("cx");

      var cy1 = this.eye1.attr("cy");
      var cy2 = this.eye2.attr("cy");

      var dur = 1000;
      var del = "0.1s";
      // console.log("aaa");
      this.mouth
        .animate(dur, "<", del)
        .attr({ d: "m160,390q71.06667,-59 130,0" });
      this.eye1.animate(dur, "<", del).attr({ cx: cx1 - 15, cy: cy1 + 10 });
      this.eye2.animate(dur, "<", del).attr({ cx: cx2 - 30, cy: cy2 + 10 });

      this.eyeb1
        .animate(dur, "<", del)
        .attr({ d: "m66,210q42,-28 77,0" })
        .rotate(-32, 105, 203);

      this.eyeb2
        .animate(dur, "<", del)
        .attr({ d: "m316,214q42,-28 77,0" })
        .rotate(39, 355, 207);
    },
    zoom() {
      var dur = 2000;
      // console.log("aaa");
      this.circle1
        .animate(dur, "<", ".5s")
        .attr({ r: "400" })
        .rotate(-70)
        .animate(2000, ">")
        .attr({ r: "300" })
        .rotate(-45);

      this.eye1.animate(dur, "<", ".5s").attr({ fill: "red" });
    }
  }
};
</script>
<style scoped>
#button1,
#button2,
#button3,
#button4,
#button5 {
  background: cadetblue;
  height: 30px;
  width: 50px;
  display: table-cell;
  border: 1px solid;
}
</style>  