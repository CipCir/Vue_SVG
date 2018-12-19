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
      slide_val: 50,
      nr_interval_points: 25,
      nr_elem: 5,
      canvas: "",
      circle1: "",
      eye1: "",
      eye2: "",
      mouth: "",
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
      eyeb_path1: [
        "",
        "m91.6875,212.25q12,-46.51563 57,-38.88416",
        "m103,202q26.13861,-34.78378 72,-14.10153",
        "",
        ""
      ],
      eyeb_path2: [
        "",
        "m407,210.71424q-11.45395,-46.02454 -54.40625,-38.47364",
        "m396,202.90678q-25.77557,-34.78379 -71,-14.10153",
        "",
        ""
      ]
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
        this.mouth_array[i] = this.create_arrays(this.mouth_string[i]);
      }
      for (var i = 0; i < this.nr_elem - 1; i++) {
        this.mouth_coef[i + 1] = this.create_coef(
          this.mouth_array[i],
          this.mouth_array[i + 1],
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
    create_plot(x) {
      var mouth_poz = this.return_unit_pos(x)[0];
      var mouth_unit = this.return_unit_pos(x)[1];
      var rez;
      rez =
        "m" +
        parseInt(
          this.mouth_array[mouth_poz][0] +
            this.mouth_coef[mouth_poz][0] * mouth_unit
        ) +
        "," +
        parseInt(
          this.mouth_array[mouth_poz][1] +
            this.mouth_coef[mouth_poz][1] * mouth_unit
        ) +
        "q" +
        parseInt(
          this.mouth_array[mouth_poz][2] +
            this.mouth_coef[mouth_poz][2] * mouth_unit
        ) +
        "," +
        parseInt(
          this.mouth_array[mouth_poz][3] +
            this.mouth_coef[mouth_poz][3] * mouth_unit
        ) +
        " " +
        parseInt(
          this.mouth_array[mouth_poz][4] +
            this.mouth_coef[mouth_poz][4] * mouth_unit
        ) +
        "," +
        parseInt(
          this.mouth_array[mouth_poz][5] +
            this.mouth_coef[mouth_poz][5] * mouth_unit
        );
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
        eyer = eyer_max;

      if (this.nr_elem == 5) {
        down_1 = 1;
        down_2 = 2;
      }

      if (this.return_unit_pos(x)[0] == down_1) {
        eyex = (x - 50) * 0.6;
        eyey = (x - 50) * ((25 - x) * 0.05 + 0.6);
        eyer = 20 + parseInt((15 / 25) * x);
      }
      if (this.return_unit_pos(x)[0] == down_2) {
        eyex = (x - 50) * 0.4;
        eyey = (x - 50) * 0.4;
        eyer = eyer_max;
        // console.log("eyer_max", eyer_max, eyer);
      }
      return [eyex, eyey, eyer];
    },
    cursive(x) {
      var s1,
        s2,
        eyer_max = 35;

      this.radial = this.canvas.gradient("linear", function(stop) {
        s1 = stop.at(0, "rgb(255,0,0)");
        s2 = stop.at(0.5, this.yellow_hex);
      });
      this.mouth.plot(this.create_plot(x));
      s1.update(0, "rgb(" + this.return_rgb(x) + ")");
      s2.update(this.return_up_val(x), this.yellow_hex, 1);
      this.radial.from(0.5, 0).to(0.5, 1);
      this.circle1.fill(this.radial);
      this.eye1.attr({
        r: this.calc_eyes(x, eyer_max)[2],
        cx: 110 + 35 + this.calc_eyes(x, eyer_max)[0],
        cy: 200 + eyer_max - this.calc_eyes(x, eyer_max)[1]
      });
      this.eye2.attr({
        r: this.calc_eyes(x, eyer_max)[2],
        cx: 320 + 35 + 2 * this.calc_eyes(x, eyer_max)[0],
        cy: 200 + eyer_max - this.calc_eyes(x, eyer_max)[1]
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