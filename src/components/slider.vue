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
      slide_val: 50,
      nr_interval_points: 25,
      nr_elem: 5,
      canvas: "",
      circle1: "",
      eye1: "",
      eye2: "",
      mouth: "",
      linear: "",
      radial: "",
      mouth_string: [
        "m160,404q46.66667,-13 75,0",
        "m155,416q56,-59 143,0",
        "m167,364q72.51333,38 146,0",
        "m167,340q90.89,96 183,0",
        "m209,265q61.29,111.191 190,49.18"
      ],
      mouth_array: [],
      mouth_coef: [],
      yellow_hex: "#f1da49",
      eyeb1_string: [
        "m41,284q60.39216,35.92308 140,33.15976",
        "m95,228q12,-46 54,-38",
        "m103,202q26.13861,-34.78378 72,-14.10153",
        "m165,222q39,-195 80,0", //"m163,219q36,-136 72,0",
        "m204,139q102,-101 98,37" //"m202,134.10798q103.03448,-92.55128 95.92865,33.89202"
      ],
      eyeb2_string: [
        "m375,283.32143q-68.58823,36.99998 -158.99999,34.15383",
        "m402,228q-12,-46 -54,-38",
        "m396,202.90678q-25.77557,-34.78379 -71,-14.10153",
        "m399,220q-41,-195 -80,0", //"m320,218q36,-136 72,0",
        "m437,218q3,-137 -96,-30" //"m332.80646,186.61096q103.03448,-92.55128 95.92865,33.89202"
      ],
      eyeb1_array: [],
      eyeb1_coef: [],
      eyeb2_array: [],
      eyeb2_coef: [],
      pinky1: "",
      pinky2: "",
      eye_x_array: [115, 130, 145, 0, 0],
      eye_y_array: [327.5, 250, 235, 235, 0],
      eye_dif: 0
    };
  },
  //M275,441 Q377,340 373,478
  //M373,475 Q376,338 277,445
  mounted() {
    this.canvas = SVG("drawing").viewbox(0, 0, 500, 500);
    this.circle1 = this.canvas.circle(500).move(0, 0);
    this.pinky1 = this.canvas.circle(10);
    this.pinky2 = this.canvas.circle(10);
    this.eye1 = this.canvas.circle(70).move(110, 200);
    this.eye2 = this.canvas.circle(70).move(320, 200);
    this.mouth = this.canvas.path("m180,360q67,48 143,0").attr({
      fill: "none",
      stroke: "#000",
      "stroke-width": 23,
      "stroke-linecap": "round"
    });
    this.eyeb1 = this.canvas
      .path("m103,202q26.13861,-34.78378 72,-14.10153")
      .attr({
        fill: "none",
        stroke: "#000",
        "stroke-width": 23,
        "stroke-linecap": "round"
      });
    this.eyeb2 = this.canvas
      .path("m396,202.90678q-25.77557,-34.78379 -71,-14.10153")
      .attr({
        fill: "none",
        stroke: "#000",
        "stroke-width": 23,
        "stroke-linecap": "round"
      });

    this.init_setup();

    this.cursive(this.slide_val);
  },
  methods: {
    init_setup() {
      for (var i = 0; i < this.nr_elem; i++) {
        //mouth
        this.mouth_array[i] = this.create_arrays(this.mouth_string[i]);
        //eyeb1
        this.eyeb1_array[i] = this.create_arrays(this.eyeb1_string[i]);
        //eyeb2
        this.eyeb2_array[i] = this.create_arrays(this.eyeb2_string[i]);
      }
      for (var i = 0; i < this.nr_elem - 1; i++) {
        //mouth
        this.mouth_coef[i + 1] = this.create_coef(
          this.mouth_array[i],
          this.mouth_array[i + 1],
          this.nr_interval_points
        );
        //eyeb1
        this.eyeb1_coef[i + 1] = this.create_coef(
          this.eyeb1_array[i],
          this.eyeb1_array[i + 1],
          this.nr_interval_points
        );
        //eyeb2
        this.eyeb2_coef[i + 1] = this.create_coef(
          this.eyeb2_array[i],
          this.eyeb2_array[i + 1],
          this.nr_interval_points
        );
      }
    },
    create_arrays(init) {
      var temp = init
        .replace("M", "")
        .replace("m", "")
        .replace("Q", ",")
        .replace("q", ",")
        .replace(" ", ",")
        .split(",");
      var temp2 = [];
      for (var i = 0; i < temp.length; i++) {
        temp2[i] = parseInt(temp[i]);
      }
      return temp2;
    },
    create_coef(v1, v2, nr) {
      var rez = [];
      for (var i = 0; i < 6; i++) {
        rez[i] = (v1[i] - v2[i]) / nr;
      }
      return rez;
    },
    create_plot(x, type) {
      var this_poz = this.return_unit_pos(x)[0];
      var this_unit = this.return_unit_pos(x)[1];
      var rez;
      if (type == "mouth") {
        rez =
          "m" +
          parseInt(
            this.mouth_array[this_poz][0] +
              this.mouth_coef[this_poz][0] * this_unit
          ) +
          "," +
          parseInt(
            this.mouth_array[this_poz][1] +
              this.mouth_coef[this_poz][1] * this_unit
          ) +
          "q" +
          parseInt(
            this.mouth_array[this_poz][2] +
              this.mouth_coef[this_poz][2] * this_unit
          ) +
          "," +
          parseInt(
            this.mouth_array[this_poz][3] +
              this.mouth_coef[this_poz][3] * this_unit
          ) +
          " " +
          parseInt(
            this.mouth_array[this_poz][4] +
              this.mouth_coef[this_poz][4] * this_unit
          ) +
          "," +
          parseInt(
            this.mouth_array[this_poz][5] +
              this.mouth_coef[this_poz][5] * this_unit
          );
      }
      if (type == "eyeb1") {
        rez =
          "m" +
          parseInt(
            this.eyeb1_array[this_poz][0] +
              this.eyeb1_coef[this_poz][0] * this_unit
          ) +
          "," +
          parseInt(
            this.eyeb1_array[this_poz][1] +
              this.eyeb1_coef[this_poz][1] * this_unit
          ) +
          "q" +
          parseInt(
            this.eyeb1_array[this_poz][2] +
              this.eyeb1_coef[this_poz][2] * this_unit
          ) +
          "," +
          parseInt(
            this.eyeb1_array[this_poz][3] +
              this.eyeb1_coef[this_poz][3] * this_unit
          ) +
          " " +
          parseInt(
            this.eyeb1_array[this_poz][4] +
              this.eyeb1_coef[this_poz][4] * this_unit
          ) +
          "," +
          parseInt(
            this.eyeb1_array[this_poz][5] +
              this.eyeb1_coef[this_poz][5] * this_unit
          );
      }
      if (type == "eyeb2") {
        rez =
          "m" +
          parseInt(
            this.eyeb2_array[this_poz][0] +
              this.eyeb2_coef[this_poz][0] * this_unit
          ) +
          "," +
          parseInt(
            this.eyeb2_array[this_poz][1] +
              this.eyeb2_coef[this_poz][1] * this_unit
          ) +
          "q" +
          parseInt(
            this.eyeb2_array[this_poz][2] +
              this.eyeb2_coef[this_poz][2] * this_unit
          ) +
          "," +
          parseInt(
            this.eyeb2_array[this_poz][3] +
              this.eyeb2_coef[this_poz][3] * this_unit
          ) +
          " " +
          parseInt(
            this.eyeb2_array[this_poz][4] +
              this.eyeb2_coef[this_poz][4] * this_unit
          ) +
          "," +
          parseInt(
            this.eyeb2_array[this_poz][5] +
              this.eyeb2_coef[this_poz][5] * this_unit
          );
      }
      return rez;
    },
    return_unit_pos(x) {
      var nr_el = this.nr_elem;
      var interval_len = this.nr_interval_points;
      for (var i = 0; i < nr_el; i++) {
        if (x >= i * interval_len && x <= interval_len * (i + 1)) {
          return [i + 1, interval_len - x + interval_len * i];
          break;
        }
      }
      return [0, 0];
    },
    return_rgb(x) {
      var rez = "0,0,0",
        i_red = 0,
        i_blue = 0;
      var len = this.nr_interval_points;
      var temp = x / this.nr_interval_points;
      var y = 0;
      if (this.nr_elem == 5) {
        i_red = 1;
        i_blue = 2;
      }
      if (temp >= i_red - 1 && temp < i_red) {
        y = len - this.return_unit_pos(x)[1];
        y = (y * 25) / len;
        rez =
          (255 - (y * 200) / len).toFixed(0).toString() +
          "," +
          parseInt(y * 3 + len) +
          "," +
          ((y * 200) / len).toFixed(0).toString();
      }
      if (temp >= i_blue - 1 && temp < i_blue) {
        y = x;
        y = (y * 25) / len;
        rez =
          parseInt(100 - y) +
          "," +
          parseInt(100 + parseInt(y)) +
          "," +
          (200 + parseInt(y)).toString();
      }
      var temp = rez.split(",");
      for (var i = 0; i < temp.length; i++) {
        if (temp[i] < 0) {
          temp[i] = 0;
        }
        if (temp[i] > 255) {
          temp[i] = 255;
        }
      }
      rez = temp.join(",");
      return rez;
    },
    return_up_val(x) {
      var rez = 0;
      var fix_int = 1;
      var decrease_int = 2;
      var correction_up;
      if (this.return_unit_pos(x)[0] == fix_int) {
        rez = 0.75;
      }
      if (this.return_unit_pos(x)[0] == decrease_int) {
        correction_up = Math.min(
          1 -
            (this.nr_interval_points - this.return_unit_pos(x)[1]) /
              this.nr_interval_points,
          0.75
        );
        rez = correction_up - (x - this.nr_interval_points) * 0.02;
      }
      return rez;
    },
    calc_eyes(x, eyer_max) {
      var rx = 0,
        ry = 0,
        down_1 = 0,
        down_2 = 0,
        eyex = 0,
        eyey = 0,
        eyer = 0;

      if (this.nr_elem == 5) {
        down_1 = 1;
        down_2 = 2;
      }

      if (this.return_unit_pos(x)[0] == down_1) {
        // eyex = (x - 50) * 0.6;
        // eyey = (x - 50) * ((this.nr_interval_points - x) * 0.05 + 0.6);
        this.eye_dif =
          ((320 - 110 - 100) / this.nr_interval_points) *
          this.return_unit_pos(x)[1];
        eyex =
          ((this.eye_x_array[this.return_unit_pos(x)[0]] -
            this.eye_x_array[this.return_unit_pos(x)[0] - 1]) /
            this.nr_interval_points) *
          this.return_unit_pos(x)[1];

        eyey =
          ((this.eye_y_array[this.return_unit_pos(x)[0]] -
            this.eye_y_array[this.return_unit_pos(x)[0] - 1]) /
            this.nr_interval_points) *
            this.return_unit_pos(x)[1] +
          2 *
            (this.eye_y_array[this.return_unit_pos(x)[0] + 1] -
              this.eye_y_array[this.return_unit_pos(x)[0]]);
        eyer = 20 + parseInt((15 / this.nr_interval_points) * x);
      }
      if (this.return_unit_pos(x)[0] == down_2) {
        // eyex = (x - 50) * 0.4;
        //eyey = (x - 50) * 0.4;
        this.eye_dif =
          (20 / this.nr_interval_points) * this.return_unit_pos(x)[1];
        eyex =
          ((this.eye_x_array[this.return_unit_pos(x)[0]] -
            this.eye_x_array[this.return_unit_pos(x)[0] - 1] -
            10) /
            this.nr_interval_points) *
          this.return_unit_pos(x)[1];
        eyey =
          ((this.eye_y_array[this.return_unit_pos(x)[0]] -
            this.eye_y_array[this.return_unit_pos(x)[0] - 1]) /
            this.nr_interval_points) *
            this.return_unit_pos(x)[1] +
          (this.eye_y_array[this.return_unit_pos(x)[0] + 1] -
            this.eye_y_array[this.return_unit_pos(x)[0]]);
        eyer = eyer_max;
      }

      return [eyex, eyey, eyer];
    },
    return_pinky(x) {
      var rez;

      if (x < this.nr_interval_points * (this.nr_elem - 2)) {
        rez = 0;
      } else {
        rez =
          (x - this.nr_interval_points * (this.nr_elem - 2)) /
            this.nr_interval_points -
          0.25;
        if (rez < 0) rez = 0;
      }

      return [rez * 100, rez];
    },
    cursive(x) {
      var s1,
        s2,
        s3,
        s4,
        eyer_max = 35;

      this.linear = this.canvas.gradient("linear", function(stop) {
        s1 = stop.at(0, "rgb(255,0,0)");
        s2 = stop.at(0.5, this.yellow_hex);
      });

      this.radial = this.canvas.gradient("radial", function(stop) {
        s3 = stop.at(0, "#ff4700");
        s4 = stop.at(1, "yellow");
      });
      s4.update(0.9, this.yellow_hex);

      this.mouth.plot(this.create_plot(x, "mouth"));
      this.eyeb1.plot(this.create_plot(x, "eyeb1"));
      this.eyeb2.plot(this.create_plot(x, "eyeb2"));

      s1.update(0, "rgb(" + this.return_rgb(x) + ")");
      s2.update(this.return_up_val(x), this.yellow_hex, 1);
      this.linear.from(0.5, 0).to(0.5, 1);
      this.circle1.fill(this.linear);
      // console.log(this.calc_eyes(x, eyer_max, this.eye_dif));
      this.eye1.attr({
        r: this.calc_eyes(x, eyer_max, this.eye_dif)[2],
        cx:
          110 +
          this.calc_eyes(x, eyer_max, this.eye_dif)[2] +
          this.calc_eyes(x, eyer_max, this.eye_dif)[0],
        cy:
          200 +
          this.calc_eyes(x, eyer_max, this.eye_dif)[2] -
          this.calc_eyes(x, eyer_max, this.eye_dif)[1]
      });
      this.eye2.attr({
        r: this.calc_eyes(x, eyer_max, this.eye_dif)[2],
        cx:
          320 +
          this.calc_eyes(x, eyer_max, this.eye_dif)[2] +
          this.calc_eyes(x, eyer_max, this.eye_dif)[0] -
          this.eye_dif,
        cy:
          200 +
          this.calc_eyes(x, eyer_max, this.eye_dif)[2] -
          this.calc_eyes(x, eyer_max, this.eye_dif)[1]
      });

      this.pinky1.attr({
        r: this.return_pinky(x)[0],
        cx: this.mouth.bbox().x,
        cy: this.mouth.bbox().y,
        fill: this.radial,
        opacity: this.return_pinky(x)[1]
      });
      this.pinky2.attr({
        r: this.return_pinky(x)[0],
        cx: this.mouth.bbox().x2,
        cy: this.mouth.bbox().y2 - this.mouth.bbox().h / 2,
        fill: this.radial,
        opacity: this.return_pinky(x)[1]
      });
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
  height: 200px;
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