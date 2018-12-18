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
      <input
        type="range"
        min="0"
        max="100"
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
      canvas: "",
      circle1: "",
      eye1: "",
      eye2: "",
      mouth: "",
      radial: ""
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

    this.cursive(this.slide_val);
  },
  methods: {
    cursive(x) {
      var s1, s2, s3;

      this.radial = this.canvas.gradient("linear", function(stop) {
        s1 = stop.at(0, "rgb(255,0,0)");
        s2 = stop.at(0.5, "#f1da49");
      });

      var up_val = 0;
      var color_string = "";
      var eyex = 0;
      var eyey = 0;
      var eyer = 0;
      var eyer_max = 35;
      var mouth_unit = 0;
      var mouth_poz = 0;

      if (x >= 0 && x <= 25) {
        up_val = 0.5;
        color_string =
          (255 - (x * 200) / 25).toFixed(0).toString() +
          "," +
          parseInt(x * 3 + 25) +
          "," +
          ((x * 200) / 25).toFixed(0).toString();
        eyex = (x - 50) * 0.6;
        eyey = (x - 50) * ((25 - x) * 0.05 + 0.6);
        eyer = 20 + parseInt((15 / 25) * x);
        mouth_unit = 25 - x;
        mouth_poz = 1;
      } else if (x > 25 && x <= 50) {
        up_val = 0.5 - (x - 25) * 0.02;
        color_string =
          parseInt(100 - x) +
          "," +
          parseInt(100 + parseInt(x)) +
          "," +
          (200 + parseInt(x)).toString();
        eyex = (x - 50) * 0.4;
        eyey = (x - 50) * 0.4;
        eyer = eyer_max;
        mouth_unit = 50 - x;
        mouth_poz = 2;
      } else if (x > 50 && x <= 75) {
        up_val = 0;
        color_string = "0,0,255";
        eyex = 0;
        eyey = 0;
        eyer = eyer_max;
        mouth_unit = 75 - x;
        mouth_poz = 3;
      } else {
        up_val = 0;
        color_string = "0,0,255";
        eyex = 0;
        eyey = 0;
        eyer = eyer_max;
        mouth_unit = 100 - x;
        mouth_poz = 4;
      }
      // console.log(mouth_unit);
      // m180,360q67,48 143,0
      // m155,385q97,3 143,0
      // m155,385q56.97902,3 84,0       1
      //m155,416q56.97902,-59 84,0      2

      //m155,416q56,-59 143,0           2
      //m163,365q56,85 143,0            3
      //m163,365q56,53 143,0
      //m159,366q72.51333,38 146,0
      //m167,364q72.51333,38 146,0      3
      //m167,340q90.89,96 183,0         4

      //m209,265q61.29033,111.19231 190,49.18121      5

      var mouth_array = [4];
      var mouth_coef = [4];
      mouth_array[1] = [155, 416, 56, -59, 143, 0];
      mouth_coef[1] = [0, -1.25, 0, 2.5, -1.6, 0];

      mouth_array[2] = [167, 366, 72, 38, 146, 0];
      mouth_coef[2] = [-0.48, 2, -0.64, -3.88, -0.125, 0];

      mouth_array[3] = [167, 340, 90, 89, 183, 0];
      mouth_coef[3] = [0, 1, -0.72, -2.32, -1.48, 0];

      mouth_array[4] = [209, 265, 61, 111, 190, 49];
      mouth_coef[4] = [-1.68, 3, 1.4, -0.6, -0.28, -1.96];

      this.mouth.plot(
        "m" +
          parseInt(
            mouth_array[mouth_poz][0] + mouth_coef[mouth_poz][0] * mouth_unit
          ) +
          "," +
          parseInt(
            mouth_array[mouth_poz][1] + mouth_coef[mouth_poz][1] * mouth_unit
          ) +
          "q" +
          parseInt(
            mouth_array[mouth_poz][2] + mouth_coef[mouth_poz][2] * mouth_unit
          ) +
          "," +
          parseInt(
            mouth_array[mouth_poz][3] + mouth_coef[mouth_poz][3] * mouth_unit
          ) +
          " " +
          parseInt(
            mouth_array[mouth_poz][4] + mouth_coef[mouth_poz][4] * mouth_unit
          ) +
          "," +
          parseInt(
            mouth_array[mouth_poz][5] + mouth_coef[mouth_poz][5] * mouth_unit
          )
      );

      console.log(this.mouth.plot());
      s1.update(0, "rgb(" + color_string + ")");
      s2.update(up_val, "#f1da49", 1);

      this.radial.from(0.5, 0).to(0.5, 1);
      // .radius(1.2);

      this.circle1.fill(this.radial);
      this.eye1.attr({
        r: eyer,
        cx: 110 + 35 + eyex,
        cy: 200 + eyer_max - eyey
      });
      this.eye2.attr({
        r: eyer,
        cx: 320 + 35 + 2 * eyex,
        cy: 200 + eyer_max - eyey
      });
    }
  }
};
</script>
<style scoped>
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