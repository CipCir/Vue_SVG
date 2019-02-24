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
      int_len: 0,
      int_nr: 0,
      int_poz: 0,
      shadow_x: 248,

      shadow_y: 430,
      shadow_w: 140,
      shadow_h: 30,
      circle1: "",
      linear_body: "",
      linear_mouth: "",
      radial_shadow: "",
      mouth_path: [
        "m192.43,257.12c72.25,38.75 84.62,-27.37 123.75,-26.43c39.12,0.93 62.49,156.18 36.62,174.74c-25.87,18.56 -63.81,-15.62 -105.99,-15.06c-42.18,0.56 -70.93,35.43 -95.68,20.81c-24.75,-14.62 -30.93,-192.81 41.31,-154.06z",
        "m192.43,294.81c35.12,-10.18 64.37,-8.25 94.5,-2.81c30.12,5.43 89.49,58.87 85.56,60.56c-3.93,1.68 -51.99,-60.625 -127.93,-62.31c-75.93,-1.68 -119.87,65.25 -121.80,62.43c-1.12,-2.81 33.75,-47.68 68.87,-57.87z",
        "m250.40,355.52c11.89,-7.78 31.44,-4.75 44.17,2.14c12.73,6.89 28.01,17.86 24.57,16.15c-3.43,-1.71 -30.69,-18.05 -48.12,-15.58c-17.42,2.46 -37.18,14.13 -40.31,15.01c-3.12,0.87 7.79,-9.92 19.69,-17.71z",
        "m165.89,324.33c36.70,29.89 114.57,33.69 157.39,-0.59c42.8164,-34.28 42.03,-34.18 6.67,0.51c-35.36,34.69 -61.17,45.96 -86.91,45.58c-25.73,-0.38 -43.51,-10.54 -81.23,-45.10c-37.72,-34.55 -32.62,-30.28 4.08,-0.39z",
        "m148.04,310.66c14.08,-14.67 185.85,-14.26 193.26,-1.34c7.41,12.91 -7.08,37.73 -17.85,50.01c-10.77,12.26 -36.92,33.37 -79.66,34.09c-42.73,0.72 -69.12,-16.90 -76.86,-25.19c-7.73,-8.29 -32.96,-42.87 -18.88,-57.55z"
      ],
      mouth_path_array: [],
      before_mouth: [
        "m",
        ",",
        "c",
        ",",
        " ",
        ",",
        " ",
        ",",
        "c",
        ",",
        " ",
        ",",
        " ",
        ",",
        "c",
        ",",
        " ",
        ",",
        " ",
        ",",
        "c",
        ",",
        " ",
        ",",
        " ",
        ",",
        "c",
        ",",
        " ",
        ",",
        " ",
        ","
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
    this.split_arrays();
    this.init_setup();
    this.cursive(this.slide_val);
  },
  methods: {
    findAndReplace(string, target, replacement) {
      var i = 0,
        length = string.length;

      for (i; i < length; i++) {
        string = string.replace(target, replacement);
      }
      return string;
    },
    init_setup() {},
    split_arrays() {
      for (var i = 0; i < this.mouth_path.length; i++) {
        var temp_string = this.mouth_path[i];

        temp_string = this.findAndReplace(temp_string, "z", "");
        temp_string = this.findAndReplace(temp_string, "Z", "");
        temp_string = this.findAndReplace(temp_string, "m", "");
        temp_string = this.findAndReplace(temp_string, "M", "");
        temp_string = this.findAndReplace(temp_string, "c", "#");
        temp_string = this.findAndReplace(temp_string, "C", "#");
        temp_string = this.findAndReplace(temp_string, " ", "#");
        temp_string = this.findAndReplace(temp_string, ",", "#");
        var temp_array = temp_string.split("#");
        this.mouth_path_array.push(temp_array);
        if (i == this.mouth_path.length - 1)
          this.mouth_path_array.push(temp_array);
      }
      // console.log(this.mouth_path_array);
    },

    correction(val1, val2) {
      var rez =
        ((parseFloat(val2) - parseFloat(val1)) / this.int_len) * this.int_poz;
      return rez;
    },
    animate_mouth(x) {
      var plot_var = "";
      //plot_var = this.mouth_path[this.int_nr];
      for (var i = 0; i < this.mouth_path_array[this.int_nr].length; i++) {
        plot_var =
          plot_var +
          this.before_mouth[i] +
          parseFloat(
            parseFloat(this.mouth_path_array[this.int_nr][i]) +
              this.correction(
                this.mouth_path_array[this.int_nr][i],
                this.mouth_path_array[this.int_nr + 1][i]
              )
          );
      }
      plot_var = plot_var + "z";
      this.mouth.plot(plot_var);
    },
    cursive(x) {
      this.int_len = this.max_val / (this.intervals - 1);
      for (var i = 0; i < this.intervals - 1; i++) {
        if (x >= i * this.int_len && x < (i + 1) * this.int_len)
          this.int_nr = i;
      }
      if (x == this.max_val) {
        this.int_nr = this.intervals - 1;
      }
      this.int_poz = x;
      while (this.int_poz >= this.int_len) {
        this.int_poz = this.int_poz - this.int_len;
      }
      this.animate_mouth(x);
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