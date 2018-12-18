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
      <div
        v-for="n in 5"
        :key="n"
        class="btn"
        :class="{'activeBtn':button==n}"
        @click="change_face(n)"
      >B{{n}}</div>
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
      eyeb2: "",
      radial: "",
      tear: "",
      pinky1: "",
      pinky2: "",
      prevx: 0,
      button: ""
    };
  },
  mounted() {
    this.canvas = SVG("drawing").viewbox(0, 0, 500, 500);
    this.circle1 = this.canvas.circle(500).move(0, 0);
    this.eye1 = this.canvas.circle(70).move(110, 200);
    this.eye2 = this.canvas.circle(70).move(320, 200);
    this.mouth = this.canvas.path("m180,360q67,48 143,0").attr({
      fill: "none",
      stroke: "#000",
      "stroke-width": 23,
      "stroke-linecap": "round"
    });
    this.eyeb1 = this.canvas.path("m105,194q42,-28 77,0").attr({
      fill: "none",
      stroke: "#000",
      "stroke-width": 18,
      "stroke-linecap": "round"
    });
    this.eyeb2 = this.canvas.path("m315,194q42,-28 77,0").attr({
      fill: "none",
      stroke: "#000",
      "stroke-width": 18,
      "stroke-linecap": "round"
    });
    this.tear = this.canvas
      .path(
        "m363.7545,288.30087c-1.01888,-0.66135 -9.11895,24.6682 -0.35661,25.39568c8.76234,0.72748 1.37549,-24.73434 0.35661,-25.39568z"
      )
      .attr({
        fill: "#718ce2",
        stroke: "#718ce2",
        "stroke-width": 18,
        "stroke-linecap": "round",
        opacity: 0
      });

    var radial2 = this.canvas.gradient("radial", function(stop) {
      stop.at(0, "red");
      stop.at(1, "#ffe53b");
    });

    this.pinky1 = this.canvas
      .circle(0)
      .move(210, 242)
      .fill(radial2)
      .after(this.mouth);
    this.pinky2 = this.canvas
      .circle(0)
      .move(420, 298)
      .fill(radial2)
      .after(this.mouth);

    this.change_face(3);
  },
  methods: {
    change_face(x) {
      this.button = x;
      var dur = 500;
      var del = "0.1s";
      // console.log(x);
      //mouth
      var d1 = "",
        w1 = "";
      //eyes
      var re = 0,
        cx1 = 0,
        cy1 = 0,
        cx2 = 0,
        cy2 = 0;
      //eyebrows
      var d2 = "",
        d3 = "";
      //head
      var c1 = "",
        c2 = "";
      //tear
      var d4 = "";
      switch (x) {
        case 1:
          d1 = "m146.75,413.5q45.37334,-10.5 83,0";
          w1 = "31";
          re = 25;
          cx1 = 100;
          cy1 = 330;
          cx2 = 290;
          cy2 = 330;
          d2 = "m25,287q51.09813,26.95652 135,30"; //M106,144 Q187,206 320,213
          d3 = "m221,316.8544q79.31559,4.6173 149.00001,-19.8544"; //M106,256 Q246,266 369,213
          c1 = "#ffe53b";
          c2 = "#db2f1b";
          d4 =
            "m363.7545,288.30087c-1.01888,-0.66135 -9.11895,24.6682 -0.35661,25.39568c8.76234,0.72748 1.37549,-24.73434 0.35661,-25.39568z";
          break;
        case 2:
          d1 = "m160,390q71.06667,-59 130,0";
          w1 = "23";
          re = 35;
          cx1 = 135;
          cy1 = 250;
          cx2 = 330;
          cy2 = 250;
          d2 = "m82,249q2.34783,-52.96154 54,-54";
          d3 = "m337,197.00001q47.08511,3.52 45.08149,55";
          c1 = "#ffe53b";
          c2 = "#718ce2";
          d4 =
            "m364.95948,386.85933c-5.82578,-2.69036 -52.14077,100.35032 -2.03902,103.30971c50.10175,2.95939 7.86482,-100.61936 2.03902,-103.30971z";
          break;
        case 3:
          d1 = "m180,360q67,48 143,0";
          w1 = "23";
          re = 35;
          cx1 = 145;
          cy1 = 235;
          cx2 = 355;
          cy2 = 235;
          d2 = "m105,194q42,-28 77,0";
          d3 = "m315,194q42,-28 77,0";
          c1 = "#ffe53b";
          c2 = "#ffe53b";
          d4 =
            "m363.7545,288.30087c-1.01888,-0.66135 -9.11895,24.6682 -0.35661,25.39568c8.76234,0.72748 1.37549,-24.73434 0.35661,-25.39568z";
          break;
        case 4:
          d1 = "m180,333q82.87037,104 179,0";
          w1 = "23";
          re = 0;
          cx1 = 185;
          cy1 = 130;
          cx2 = 375;
          cy2 = 130;
          d2 = "m154,209q40.36364,-152 74,0";
          d3 = "m319,210q43.09091,-154 79,0";
          c1 = "#ffe53b";
          c2 = "#ffea60";
          d4 =
            "m363.7545,288.30087c-1.01888,-0.66135 -9.11895,24.6682 -0.35661,25.39568c8.76234,0.72748 1.37549,-24.73434 0.35661,-25.39568z";
          break;
        case 5:
          d1 = "m209,265q61.29033,111.19231 190,49.18121";
          w1 = "23";
          re = 0;
          cx1 = 265;
          cy1 = 100;
          cx2 = 405;
          cy2 = 140;
          d2 = "m202,135.50069q103.03448,-88.74811 95.92865,32.49931";
          d3 = "m343.80646,185.50367q103.03448,-88.74811 95.92865,32.49931";
          c1 = "#ffe53b";
          c2 = "#ffea60";
          d4 =
            "m363.7545,288.30087c-1.01888,-0.66135 -9.11895,24.6682 -0.35661,25.39568c8.76234,0.72748 1.37549,-24.73434 0.35661,-25.39568z";
          break;
      }
      //   console.log(d1);
      this.mouth.animate(dur, "<", del).attr({ d: d1, "stroke-width": w1 });
      this.eye1.animate(dur, "<", del).attr({ cx: cx1, cy: cy1, r: re });
      this.eye2.animate(dur, "<", del).attr({ cx: cx2, cy: cy2, r: re });
      this.eyeb1.animate(dur, "<", del).attr({ d: d2 });
      this.eyeb2.animate(dur, "<", del).attr({ d: d3 });

      this.radial = this.canvas.gradient("linear", function(stop) {
        stop.at(0, c1);
        stop.at(1, c2);
      });

      // console.log(this.prev_x, x);
      if (this.prev_x != x) {
        this.radial.from(0.5, 0).to(0.5, 0);
        this.radial.animate(dur, "<", del).from(0.5, 0.4);
        this.circle1.fill(this.radial);
      }

      if (x == 2) {
        this.tear.animate(dur, "<", del).attr({ opacity: 0.8, d: d4 });
      } else {
        this.tear.animate(dur, "<", del).attr({ opacity: 0, d: d4 });
      }

      if (x == 5) {
        this.pinky1.animate(dur, "<", del).attr({ opacity: 0.4, r: 50 });
        this.pinky2.animate(dur, "<", del).attr({ opacity: 0.4, r: 50 });
      } else {
        this.pinky1.animate(dur, "<", del).attr({ opacity: 0, r: 0 });
        this.pinky2.animate(dur, "<", del).attr({ opacity: 0, r: 0 });
      }

      this.prev_x = x;
    }
  }
};
</script>
<style scoped>
.btn {
  background: cadetblue;
  height: 30px;
  width: 50px;
  display: table-cell;
  border: 1px solid;
  cursor: pointer;
}
.activeBtn {
  background: #086d64;
  transform: scale(1.2);
}
</style>  