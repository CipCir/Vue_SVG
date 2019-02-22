<template>
  <div id="PageContainer">
    <svg
      id="drawing"
      width="100%"
      height="100%"
      viewBox="0 0 500 500"
      style="border:1px solid black;"
    ></svg>
    <center>
      <input
        type="range"
        min="0"
        :max="max_val"
        value="0"
        class="slider"
        id="myRange"
        v-model="slide_val"
        @input="cursive(slide_val)"
      >
      <div id="output">{{slide_val}}</div>
    </center>
  </div>
</template>
<script>
import SVG from "svg.js";
export default {
  data() {
    return {
      slide_val: 0,
      intervals: 5,
      max_val: 100,
      canvas: "",
      body: "",
      mouth: "",
      shadow: "",
      shadow_x: 248,

      shadow_y: 430,
      shadow_w: 140,
      shadow_h: 30,
      circle1: "",
      linear_body: "",
      linear_mouth: "",
      radial_shadow: "",
      mouth_path: [
        "m192.43748,257.12498c72.25,38.75 84.625,-27.375 123.75,-26.4375c39.125,0.9375 62.49998,156.18749 36.62499,174.74999c-25.87499,18.5625 -63.81249,-15.625 -105.99999,-15.0625c-42.1875,0.5625 -70.9375,35.4375 -95.6875,20.8125c-24.75,-14.625 -30.9375,-192.81249 41.3125,-154.06249z",
        "m192.43748,294.81248c35.125,-10.1875 64.375,-8.25 94.5,-2.8125c30.125,5.4375 89.49998,58.87499 85.56249,60.56249c-3.93749,1.6875 -51.99999,-60.625 -127.93749,-62.3125c-75.9375,-1.6875 -119.875,65.25 -121,62.4375c-1.125,-2.8125 33.75,-47.68749 68.875,-57.87499z",
        "m244.35154,358.91404c6.39062,-4.38672 21.46094,-7.85156 34.33594,-6.16406c12.875,1.6875 34.74998,14.62499 41.31249,20.81249c6.56251,6.1875 -19.64452,-14.44141 -44.68749,-15.0625c-25.04297,-0.62109 -45.46094,18.97266 -45.08594,13.91016l11.59376,-11.59765z",
        "m165.8996,324.33023c36.70703,29.89063 114.57815,33.6914 157.39455,-0.59767c42.8164,-34.28907 42.03902,-34.18359 6.67184,0.51563c-35.36717,34.69923 -61.17576,45.96875 -86.91014,45.58202c-25.73438,-0.38673 -43.51563,-10.54687 -81.23829,-45.10546c-37.72266,-34.55859 -32.62498,-30.28516 4.08204,-0.39452z",
        "m148.04596,310.66322c14.08203,-14.67187 185.8594,-14.26173 193.26955,-1.34767c7.41015,12.91406 -7.08601,37.73827 -17.85941,50c-10.77341,12.26173 -36.92576,33.375 -79.66014,34.09765c-42.73438,0.72265 -69.12501,-16.90626 -76.86329,-25.19921c-7.73827,-8.29296 -32.96874,-42.8789 -18.88671,-57.55077z"
      ]
    };
  },
  mounted() {
    this.canvas = SVG("drawing").viewbox(0, 0, 500, 500);

    this.shadow = this.canvas
      .ellipse(this.shadow_w, this.shadow_h)
      .move(this.shadow_x, this.shadow_y)
      .attr({ id: "shadow" });
    this.body = this.canvas
      .path(
        "m244.89061,442.24997c18.375,0.1875 161.10936,4.25 161.10936,-66.25c0,-70.49999 -27.99999,-196.74999 -163.74999,-194.49999c-135.75,2.25 -157.48437,120.20313 -157.49998,192.75002c-0.01561,72.54689 141.76561,67.81247 160.14061,67.99997z"
      )
      .attr({
        linecap: "round",
        "stroke-linejoin": "null",
        "stroke-dasharray": "null",
        "stroke-width": "0.1",
        stroke: "#000000",
        fill: "none",
        id: "body"
      });

    this.mouth = this.canvas.path(this.mouth_path[0]).attr({
      linecap: "round",
      "stroke-linejoin": "null",
      "stroke-dasharray": "null",
      "stroke-width": "0.1",
      stroke: "#000000",
      fill: "none",
      id: "mouth"
    });

    // this.circle1 = this.canvas.circle(100).move(190, 260);

    var s1, s2, s3, s4;

    this.linear_body = this.canvas.gradient("linear", function(stop) {
      s1 = stop.at(0, "rgb(152,183,205)");
      s2 = stop.at(0.7, "rgb(92,162,207)");
      s3 = stop.at(1, "rgb(42,74,157)");
    });
    this.linear_body.from(0.5, 0).to(0.5, 1);
    this.body.fill(this.linear_body);

    this.linear_mouth = this.canvas.gradient("linear", function(stop) {
      // s1 = stop.at(0, "rgb(22,174,167)");
      // s2 = stop.at(0.1, "rgb(37,83,167)");
      // s3 = stop.at(0.6, "rgb(24,161,167)");
      // s4 = stop.at(1, "rgb(22,174,167)");
      // s1 = stop.at(0, "#f3e1bf");
      // s2 = stop.at(0.5, "#e6ae5e");
      // s4 = stop.at(1, "#f3e1bf");
      // s1 = stop.at(0, "green");
      // s2 = stop.at(1, "green");
      // s1 = stop.at(0, "#baadda");
      s1 = stop.at(0, "#2c2c84");
      s2 = stop.at(1, "#baadda");

      // s1 = stop.at(0, "#2c2c84");
      // s2 = stop.at(0.2, "#2c2c84");
      // s3 = stop.at(1, "#2c2c84");
    });
    this.linear_mouth.from(0.5, 0).to(0.5, 1);
    this.mouth.fill(this.linear_mouth);

    this.radial_shadow = this.canvas.gradient("radial", function(stop) {
      s1 = stop.at(0, "black");
      s2 = stop.at(1, "transparent");
    });
    this.shadow.fill(this.radial_shadow);

    // this.circle1.fill(this.linear_body);
    // this.body_2.maskWith(this.circle1);

    this.init_setup();
    this.cursive(this.slide_val);
  },
  methods: {
    init_setup() {},
    animate_mouth(x, int_nr) {
      console.log(int_nr);
      this.mouth.plot(this.mouth_path[int_nr]);
    },
    cursive(x) {
      // console.log(x);
      var int_len = this.max_val / (this.intervals - 1);
      var int_nr = -1;
      for (var i = 0; i < this.intervals - 1; i++) {
        if (x > i * int_len && x < (i + 1) * int_len) int_nr = i;
      }
      if (x == this.max_val) {
        int_nr = this.intervals - 1;
        console.log(int_nr);
      }
      this.animate_mouth(x, int_nr);
      this.rotate_x((x - this.max_val / 2) / (this.max_val / 10));
    },
    rotate_x(x) {
      var body = document.getElementById("body");
      body.setAttribute("transform", "rotate(" + x + ",250,0) ");
      var mouth = document.getElementById("mouth");
      mouth.setAttribute("transform", "rotate(" + x + ",250,0) ");
      var shadow = document.getElementById("shadow");
      shadow.setAttribute("cx", this.shadow_x - x);
      shadow.setAttribute("rx", this.shadow_w - Math.abs(x));
    }
  }
};
</script>
<style scoped>
@media only screen and (max-width: 400) {
  #PageContainer {
    width: 100%;
    height: auto;
    max-height: 60vh;
  }
}

#PageContainer {
  height: 300px;
}
#output {
  border: 1px solid black;
  width: 60px;
  height: 50px;
  font-size: xx-large;
}
/* for slider */

#myRange {
  height: 50px;
}
input[type="range"] {
  /*removes default webkit styles*/
  -webkit-appearance: none;

  /*fix for FF unable to apply focus style bug */
  border: 1px solid white;

  /*required for proper track sizing in FF*/
  width: 300px;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 300px;
  height: 5px;
  background: #ddd;
  border: none;
  border-radius: 3px;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: goldenrod;
  margin-top: -4px;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #ccc;
}

input[type="range"]::-moz-range-track {
  width: 300px;
  height: 5px;
  background: #ddd;
  border: none;
  border-radius: 3px;
}
input[type="range"]::-moz-range-thumb {
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: goldenrod;
}

/*hide the outline behind the border*/
input[type="range"]:-moz-focusring {
  outline: 1px solid white;
  outline-offset: -1px;
}

input[type="range"]::-ms-track {
  width: 300px;
  height: 5px;

  /*remove bg colour from the track, we'll use ms-fill-lower and ms-fill-upper instead */
  background: transparent;

  /*leave room for the larger thumb to overflow with a transparent border */
  border-color: transparent;
  border-width: 6px 0;

  /*remove default tick marks*/
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  background: #777;
  border-radius: 10px;
}
input[type="range"]::-ms-fill-upper {
  background: #ddd;
  border-radius: 10px;
}
input[type="range"]::-ms-thumb {
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: goldenrod;
}
input[type="range"]:focus::-ms-fill-lower {
  background: #888;
}
input[type="range"]:focus::-ms-fill-upper {
  background: #ccc;
}
</style>  