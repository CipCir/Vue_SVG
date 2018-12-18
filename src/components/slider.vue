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
      radial: ""
    };
  },
  mounted() {
    this.canvas = SVG("drawing").viewbox(0, 0, 500, 500);
    this.circle1 = this.canvas.circle(500).move(0, 0);

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

      if (x >= 0 && x <= 25) {
        up_val = 0.5;
        color_string =
          (255 - (x * 125) / 25).toFixed(0).toString() +
          ",0," +
          ((x * 125) / 25).toFixed(0).toString();
      } else if (x > 25 && x <= 50) {
        up_val = 0.5 - (x - 25) * 0.02;
        color_string = "0,0,255";
      } else {
        up_val = 0;
        color_string = "0,0,255";
      }
      s1.update(0, "rgb(" + color_string + ")");
      s2.update(up_val, "#f1da49", 1);

      this.radial.from(0.5, 0).to(0.5, 1);

      this.circle1.fill(this.radial);
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