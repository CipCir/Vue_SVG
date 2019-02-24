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
        @input="animate(slide_val)"
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
      intervals: 4,
      max_val: 100,
      canvas: "",
      input_type: {
        0: "ellipse",
        1: "path",
        2: "path",
        3: "path",
        4: "path",
        5: "path",
        6: "circle",
        7: "circle",
        8: "circle",
        9: "circle",
        10: "path",
        11: "path",
        12: "path"
      },
      input_path: {
        //shadow
        0: [
          //   "m88.75,441c1.88566,36 313.28873,33.75 312.74997,3.5c-0.53876,-30.25 -311.94183,-27.25 -312.48059,-5.75",
          //   "m88.75,441c1.88566,36 313.28873,33.75 312.74997,3.5c-0.53876,-30.25 -311.94183,-27.25 -312.48059,-5.75",
          //   "m88.75,441c1.88566,36 313.28873,33.75 312.74997,3.5c-0.53876,-30.25 -311.94183,-27.25 -312.48059,-5.75",
          //   "m88.75,441c1.88566,36 313.28873,33.75 312.74997,3.5c-0.53876,-30.25 -311.94183,-27.25 -312.48059,-5.75",
          //   "m88.75,441c1.88566,36 313.28873,33.75 312.74997,3.5c-0.53876,-30.25 -311.94183,-27.25 -312.48059,-5.75"
          "130,20,230,445",
          "130,20,240,445",
          "140,20,250,445",
          "130,20,260,445",
          "130,20,270,445"
        ],
        //body
        1: [
          "m244.89061,442.24997c18.375,0.1875 161.10936,4.25 161.10936,-66.25c0,-70.49999 -27.99999,-196.74999 -163.74999,-194.49999c-135.75,2.25 -157.48437,120.20313 -157.49998,192.75002c-0.01561,72.54689 141.76561,67.81247 160.14061,67.99997z",
          "m244.89061,442.24997c18.375,0.1875 161.10936,4.25 161.10936,-66.25c0,-70.49999 -27.99999,-196.74999 -163.74999,-194.49999c-135.75,2.25 -157.48437,120.20313 -157.49998,192.75002c-0.01561,72.54689 141.76561,67.81247 160.14061,67.99997z",
          "m244.89061,442.24997c18.375,0.1875 161.10936,4.25 161.10936,-66.25c0,-70.49999 -27.99999,-196.74999 -163.74999,-194.49999c-135.75,2.25 -157.48437,120.20313 -157.49998,192.75002c-0.01561,72.54689 141.76561,67.81247 160.14061,67.99997z",
          "m244.89061,442.24997c18.375,0.1875 161.10936,4.25 161.10936,-66.25c0,-70.49999 -27.99999,-196.74999 -163.74999,-194.49999c-135.75,2.25 -157.48437,120.20313 -157.49998,192.75002c-0.01561,72.54689 141.76561,67.81247 160.14061,67.99997z",
          "m244.89061,442.24997c18.375,0.1875 161.10936,4.25 161.10936,-66.25c0,-70.49999 -27.99999,-196.74999 -163.74999,-194.49999c-135.75,2.25 -157.48437,120.20313 -157.49998,192.75002c-0.01561,72.54689 141.76561,67.81247 160.14061,67.99997z"
        ],
        //mouth
        2: [
          "m192.43,257.12c72.25,38.75 84.62,-27.37 123.75,-26.43c39.12,0.93 62.49,156.18 36.62,174.74c-25.87,18.56 -63.81,-15.62 -105.99,-15.06c-42.18,0.56 -70.93,35.43 -95.68,20.81c-24.75,-14.62 -30.93,-192.81 41.31,-154.06z",
          "m192.43,294.81c35.12,-10.18 64.37,-8.25 94.5,-2.81c30.12,5.43 89.49,58.87 85.56,60.56c-3.93,1.68 -51.99,-60.625 -127.93,-62.31c-75.93,-1.68 -119.87,65.25 -121.80,62.43c-1.12,-2.81 33.75,-47.68 68.87,-57.87z",
          "m250.40,355.52c11.89,-7.78 31.44,-4.75 44.17,2.14c12.73,6.89 28.01,17.86 24.57,16.15c-3.43,-1.71 -30.69,-18.05 -48.12,-15.58c-17.42,2.46 -37.18,14.13 -40.31,15.01c-3.12,0.87 7.79,-9.92 19.69,-17.71z",
          "m165.89,324.33c36.70,29.89 114.57,33.69 157.39,-0.59c42.8164,-34.28 42.03,-34.18 6.67,0.51c-35.36,34.69 -61.17,45.96 -86.91,45.58c-25.73,-0.38 -43.51,-10.54 -81.23,-45.10c-37.72,-34.55 -32.62,-30.28 4.08,-0.39z",
          "m148.04,310.66c14.08,-14.67 185.85,-14.26 193.26,-1.34c7.41,12.91 -7.08,37.73 -17.85,50.01c-10.77,12.26 -36.92,33.37 -79.66,34.09c-42.73,0.72 -69.12,-16.90 -76.86,-25.19c-7.73,-8.29 -32.96,-42.87 -18.88,-57.55z"
        ],
        //chin
        3: [
          "m215.30224,401.01293c1.39746,-1.26564 9.71631,-7.72558 29.80713,-7.82543c20.09082,-0.09985 31.50317,4.38451 32.77442,5.50415c1.27126,1.11964 -12.81349,-3.229 -32.77443,-2.9729c-19.96094,0.2561 -31.20457,6.55982 -29.80712,5.29418z",
          "m207.84096,300.05819c1.39746,-1.26564 9.71631,-7.72558 29.80713,-7.82543c20.09082,-0.09985 31.50317,4.38451 32.77442,5.50415c1.27126,1.11964 -12.81349,-3.229 -32.77443,-2.9729c-19.96094,0.2561 -31.20457,6.55982 -29.80712,5.29418z",
          "m262.53628,363.83749c1.39746,-1.26564 4.97021,-2.66308 12.72119,-3.07934c7.75098,-0.41626 16.63207,3.11889 19.48536,5.18775c2.85329,2.06886 -5.85257,-3.22901 -17.90335,-3.28932c-12.05078,-0.06031 -15.70066,2.44655 -14.30321,1.18091z",
          "m204.21401,361.0665c-0.02638,-0.37574 13.45386,11.85205 39.77393,12.10816c26.32007,0.25611 36.30857,-9.31984 36.86791,-9.09009c0.55934,0.22975 -10.67773,10.11938 -37.04589,10.19751c-26.36817,0.07812 -39.56957,-12.83984 -39.59595,-13.21558z",
          "m212.26478,393.01913c2.82128,0.15819 25.61572,2.95313 30.04443,2.85328c4.42871,-0.09985 27.9436,-3.44654 25.89259,-2.56421c-2.05101,0.88233 -19.93264,4.12744 -25.65529,4.14624c-5.72265,0.0188 -33.10301,-4.5935 -30.28173,-4.43531z"
        ],
        //eye white left
        4: [
          "m186.29103,211.14257c3.76855,15.77734 25.01072,13.73437 32.12009,11.60059c7.10938,-2.13379 22.29688,-6.70116 18.50586,-23.2959c-3.79102,-16.59474 -18.86914,-15.38379 -27.58496,-14.14648c-8.71582,1.23731 -26.80954,10.06445 -23.04099,25.84179z",
          "m180.86066,213.969c4.16806,17.4608 27.66215,15.19985 35.5252,12.83839c7.86306,-2.36147 24.66061,-7.41618 20.4677,-25.7816c-4.19291,-18.36542 -20.86949,-17.02526 -30.50929,-15.65593c-9.6398,1.36933 -29.65167,11.13834 -25.48361,28.59914z",
          "m186.29103,211.14257c3.76855,15.77734 25.01072,13.73437 32.12009,11.60059c7.10938,-2.13379 22.29688,-6.70116 18.50586,-23.2959c-3.79102,-16.59474 -18.86914,-15.38379 -27.58496,-14.14648c-8.71582,1.23731 -26.80954,10.06445 -23.04099,25.84179z",
          "m180.86066,213.969c4.16806,17.4608 27.66215,15.19985 35.5252,12.83839c7.86306,-2.36147 24.66061,-7.41618 20.4677,-25.7816c-4.19291,-18.36542 -20.86949,-17.02526 -30.50929,-15.65593c-9.6398,1.36933 -29.65167,11.13834 -25.48361,28.59914z",
          "m186.29103,211.14257c3.76855,15.77734 25.01072,13.73437 32.12009,11.60059c7.10938,-2.13379 22.29688,-6.70116 18.50586,-23.2959c-3.79102,-16.59474 -18.86914,-15.38379 -27.58496,-14.14648c-8.71582,1.23731 -26.80954,10.06445 -23.04099,25.84179z"
        ],
        //eye white right
        5: [
          "m286.64257,205.0235c-1.34966,14.51172 -17.03767,17.00391 -28.24203,16.71581c-11.20435,-0.28809 -23.11483,-5.25096 -21.51802,-20.60643c1.59681,-15.35548 16.57579,-20.10352 24.99013,-19.10352c8.41434,1 26.11957,8.48242 24.76992,22.99414z",
          "m291.27642,207.22603c-1.47498,15.89408 -18.61968,18.62368 -30.86441,18.30813c-12.24472,-0.31553 -25.26113,-5.75116 -23.51605,-22.56937c1.74508,-16.81822 18.11492,-22.01855 27.31056,-20.92329c9.19564,1.09526 28.54487,9.29044 27.0699,25.18453z",
          "m286.64257,205.0235c-1.34966,14.51172 -17.03767,17.00391 -28.24203,16.71581c-11.20435,-0.28809 -23.11483,-5.25096 -21.51802,-20.60643c1.59681,-15.35548 16.57579,-20.10352 24.99013,-19.10352c8.41434,1 26.11957,8.48242 24.76992,22.99414z",
          "m291.27642,207.22603c-1.47498,15.89408 -18.61968,18.62368 -30.86441,18.30813c-12.24472,-0.31553 -25.26113,-5.75116 -23.51605,-22.56937c1.74508,-16.81822 18.11492,-22.01855 27.31056,-20.92329c9.19564,1.09526 28.54487,9.29044 27.0699,25.18453z",
          "m286.64257,205.0235c-1.34966,14.51172 -17.03767,17.00391 -28.24203,16.71581c-11.20435,-0.28809 -23.11483,-5.25096 -21.51802,-20.60643c1.59681,-15.35548 16.57579,-20.10352 24.99013,-19.10352c8.41434,1 26.11957,8.48242 24.76992,22.99414z"
        ],
        //eye black left
        6: [
          "14,220,203",
          "17,220,203",
          "14,220,203",
          "17,210,203",
          "14,220,203"
        ],
        //eye black right
        7: [
          "14,254,202",
          "17,254,202",
          "14,254,202",
          "17,264,202",
          "14,254,202"
        ],
        //eye light left
        8: ["5,227,200", "7,227,200", "5,227,200", "5,217,200", "5,227,200"],
        //eye light right
        9: ["5,248,199", "7,248,199", "5,248,199", "5,258,199", "5,248,199"],
        //midmouth
        10: [
          "m179.70433,391.96695c-13.82503,-17.59208 9.10129,-39.55129 63.71015,-40.6508c54.60886,-1.0995 77.24391,21.56296 73.0964,38.05553c-4.14751,16.49257 -33.34258,-10.63804 -69.28765,-9.53855c-35.94508,1.09951 -53.69387,29.72588 -67.5189,12.13382z",
          "m237.45557,288.72742c0.00153,0.02157 -0.00101,0.0485 -0.00704,0.04985c-0.00604,0.00135 -0.00854,-0.02644 -0.00808,-0.04666c0.00046,-0.02022 0.00369,0.01304 0.00766,0.0117c0.00397,-0.00135 0.00594,-0.03645 0.00746,-0.01488z",
          "m237.45557,288.72742c0.00153,0.02157 -0.00101,0.0485 -0.00704,0.04985c-0.00604,0.00135 -0.00854,-0.02644 -0.00808,-0.04666c0.00046,-0.02022 0.00369,0.01304 0.00766,0.0117c0.00397,-0.00135 0.00594,-0.03645 0.00746,-0.01488z",
          "m237.45557,288.72742c0.00153,0.02157 -0.00101,0.0485 -0.00704,0.04985c-0.00604,0.00135 -0.00854,-0.02644 -0.00808,-0.04666c0.00046,-0.02022 0.00369,0.01304 0.00766,0.0117c0.00397,-0.00135 0.00594,-0.03645 0.00746,-0.01488z",
          "m237.45557,288.72742c0.00153,0.02157 -0.00101,0.0485 -0.00704,0.04985c-0.00604,0.00135 -0.00854,-0.02644 -0.00808,-0.04666c0.00046,-0.02022 0.00369,0.01304 0.00766,0.0117c0.00397,-0.00135 0.00594,-0.03645 0.00746,-0.01488z"
        ]
      },
      input_rotate: {
        0: false,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true,
        10: true
      },
      input_colors: {
        0: {
          type: "radial",
          color: "black*transparent",
          stops: "0*1"
        },
        1: {
          type: "linear",
          color: "rgb(152,183,205)*rgb(92,162,207)*rgb(42,74,157)",
          stops: "0*0.7*1",
          from: "0.5,0",
          to: "0.5,1"
        },
        2: {
          type: "linear",
          color: "#2c2c84*#baadda",
          stops: "0*1",
          from: "0.5,0",
          to: "0.5,1"
        },

        3: { type: "simple", color: "#2c2c84" },
        4: {
          type: "radial",
          color: "white*white*#d1d1d1",
          stops: "0*0.8*1",
          from: "0.55,0.5",
          to: "0.5,0.45",
          radius: "0.55"
        },
        5: {
          type: "radial",
          color: "white*white*#d1d1d1",
          stops: "0*0.8*1",
          from: "0.55,0.5",
          to: "0.5,0.45",
          radius: "0.55"
        },
        6: {
          type: "radial",
          // color: "#039be5*#014769",
          color: "#0c7b74*#44b9b3*#209891*#0c7b74",
          stops: "0*0.1*0.5*1",
          from: "0.8,0.3",
          to: "0.5,0.2",
          radius: "0.55"
        },
        7: {
          type: "radial",
          // color: "#039be5*#014769",
          color: "#0c7b74*#44b9b3*#209891*#0c7b74",
          stops: "0*0.1*0.5*1",
          from: "0.2,0.3",
          to: "0.5,0.2",
          radius: "0.55"
        },
        8: { type: "simple", color: "white" },
        9: { type: "simple", color: "white" },
        10: { type: "simple", color: "rgb(42,74,157)" }
      },

      input_border: {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "1*#c1c1c1",
        5: "1*#c1c1c1",
        6: "",
        7: "",
        8: "",
        9: "",
        10: ""
      },
      input_fronts: {},
      input_numbers: {},
      path_objects: {}
    };
  },

  mounted() {
    this.canvas = SVG("drawing").viewbox(0, 0, 500, 500);

    for (var i = 0; i < Object.keys(this.input_path).length; i++) {
      //drawing path shapes
      if (this.input_type[i] == "path") {
        this.path_objects[i] = this.canvas.path(this.input_path[i][0]).attr({
          linecap: "round",
          "stroke-linejoin": "null",
          "stroke-dasharray": "null",
          "stroke-width":
            this.input_border[i].split("*")[0] != ""
              ? this.input_border[i].split("*")[0]
              : 0,
          stroke:
            this.input_border[i].split("*")[1] != ""
              ? this.input_border[i].split("*")[1]
              : "black",
          fill: "none",
          id: "object" + i
        });
      }
      if (this.input_type[i] == "circle") {
        this.path_objects[i] = this.canvas
          .circle(this.input_path[i][0].split(",")[0])
          .attr({
            "stroke-width":
              this.input_border[i].split("*")[0] != ""
                ? this.input_border[i].split("*")[0]
                : 0,
            stroke:
              this.input_border[i].split("*")[1] != ""
                ? this.input_border[i].split("*")[1]
                : "black",
            cx: this.input_path[i][0].split(",")[1],
            cy: this.input_path[i][0].split(",")[2],
            id: "object" + i
          });
      }

      if (this.input_type[i] == "ellipse") {
        this.path_objects[i] = this.canvas
          .ellipse(
            this.input_path[i][0].split(",")[0],
            this.input_path[i][0].split(",")[1]
          )
          .attr({
            "stroke-width":
              this.input_border[i].split("*")[0] != ""
                ? this.input_border[i].split("*")[0]
                : 0,
            stroke:
              this.input_border[i].split("*")[1] != ""
                ? this.input_border[i].split("*")[1]
                : "black",
            cx: this.input_path[i][0].split(",")[2],
            cy: this.input_path[i][0].split(",")[3],
            id: "object" + i
          });
      }
    }

    // this.path_objects[99] = this.canvas.circle(50);

    // this.path_objects[99].attr({
    //   r: 30,
    //   cx: 0,
    //   cy: 0
    // });

    this.add_colors();
    this.create_splits();

    // this.rotate_all(this.slide_val);
    this.animate(this.slide_val);
  },
  methods: {
    animate(x) {
      console.log("in animate for:", x);
      var int_size = this.max_val / this.intervals;
      var int_number = 0;
      var int_poz = parseInt(x);
      while (int_poz > int_size) {
        int_poz = int_poz - int_size;
        int_number++;
      }

      for (var i = 0; i < Object.keys(this.input_path).length; i++) {
        if (this.input_type[i] == "path") {
          this.path_objects[i].plot(
            this.recalculate_path(i, int_number, int_poz)
          );
        }
        if (this.input_type[i] == "circle") {
          this.path_objects[i].attr({
            r:
              parseInt(this.input_path[i][int_number].split(",")[0]) +
              parseInt(
                this.calc_difference(
                  this.input_path[i][int_number + 1].split(",")[0],
                  this.input_path[i][int_number].split(",")[0],
                  int_poz
                )
              ),
            cx:
              parseInt(this.input_path[i][int_number].split(",")[1]) +
              parseInt(
                this.calc_difference(
                  this.input_path[i][int_number + 1].split(",")[1],
                  this.input_path[i][int_number].split(",")[1],
                  int_poz
                )
              ),
            cy:
              parseInt(this.input_path[i][int_number].split(",")[2]) +
              parseInt(
                this.calc_difference(
                  this.input_path[i][int_number + 1].split(",")[2],
                  this.input_path[i][int_number].split(",")[2],
                  int_poz
                )
              )
          });
        }
        if (this.input_type[i] == "ellipse") {
          this.path_objects[i].attr({
            rx:
              parseInt(this.input_path[i][int_number].split(",")[0]) +
              parseInt(
                this.calc_difference(
                  this.input_path[i][int_number + 1].split(",")[0],
                  this.input_path[i][int_number].split(",")[0],
                  int_poz
                )
              ),
            ry:
              parseInt(this.input_path[i][int_number].split(",")[1]) +
              parseInt(
                this.calc_difference(
                  this.input_path[i][int_number + 1].split(",")[1],
                  this.input_path[i][int_number].split(",")[1],
                  int_poz
                )
              ),
            cx:
              parseInt(this.input_path[i][int_number].split(",")[2]) +
              parseInt(
                this.calc_difference(
                  this.input_path[i][int_number + 1].split(",")[2],
                  this.input_path[i][int_number].split(",")[2],
                  int_poz
                )
              ),
            cy:
              parseInt(this.input_path[i][int_number].split(",")[3]) +
              parseInt(
                this.calc_difference(
                  this.input_path[i][int_number + 1].split(",")[3],
                  this.input_path[i][int_number].split(",")[3],
                  int_poz
                )
              )
          });
        }
      }

      // this.rotate_all(this.slide_val);
    },
    calc_difference(val1, val2, int_poz) {
      return ((val1 - val2) / (this.max_val / this.intervals)) * int_poz;
    },
    recalculate_path(i, int_number, int_poz) {
      var rez = "";
      var temp = [];
      for (
        var elem = 0;
        elem < this.input_numbers[i][int_number].length;
        elem++
      ) {
        temp[elem] =
          this.input_numbers[i][int_number][elem] +
          this.calc_difference(
            this.input_numbers[i][int_number + 1][elem],
            this.input_numbers[i][int_number][elem],
            int_poz
          );

        rez = rez + this.input_fronts[i][int_number][elem] + temp[elem];
      }
      if (
        this.input_numbers[i][int_number].length <
        this.input_fronts[i][int_number].length
      ) {
        rez =
          rez +
          this.input_fronts[i][int_number][
            this.input_numbers[i][int_number].length
          ];
      }

      return rez;
    },
    rotate_all(x) {
      for (var i = 0; i < Object.keys(this.input_path).length; i++) {
        if (this.input_rotate[i]) {
          var element = document.getElementById("object" + i);
          element.setAttribute(
            "transform",
            "rotate(" + (this.max_val / 2 - x) / 10 + ",250,0) "
          );
        }
      }
    },
    add_colors() {
      for (var i = 0; i < Object.keys(this.input_path).length; i++) {
        var vue_OBJ = this;
        switch (this.input_colors[i].type) {
          case "simple":
            this.path_objects[i].fill(this.input_colors[i]);
            break;
          case "linear":
            var linear_color = this.canvas.gradient("linear", function(stop) {
              var color_array = vue_OBJ.input_colors[i].color.split("*");
              var stops_array = vue_OBJ.input_colors[i].stops.split("*");
              // console.log(color_array);
              for (var j = 0; j < color_array.length; j++) {
                stop.at(parseFloat(stops_array[j]), color_array[j]);
              }
            });
            if (vue_OBJ.input_colors[i].from && vue_OBJ.input_colors[i].to) {
              // console.log(vue_OBJ.input_colors[i]);
              var from1 = parseFloat(
                vue_OBJ.input_colors[i].from.split(",")[0]
              );
              var from2 = parseFloat(
                vue_OBJ.input_colors[i].from.split(",")[1]
              );
              var to1 = parseFloat(vue_OBJ.input_colors[i].to.split(",")[0]);
              var to2 = parseFloat(vue_OBJ.input_colors[i].to.split(",")[1]);

              linear_color.from(from1, from2).to(to1, to2);
            }

            this.path_objects[i].fill(linear_color);
            break;
          case "radial":
            var radial = this.canvas.gradient("radial", function(stop) {
              var color_array = vue_OBJ.input_colors[i].color.split("*");
              var stops_array = vue_OBJ.input_colors[i].stops.split("*");
              // console.log(color_array);
              for (var j = 0; j < color_array.length; j++) {
                console.log(parseFloat(stops_array[j]), color_array[j]);
                stop.at(parseFloat(stops_array[j]), color_array[j]);
              }
            });

            if (vue_OBJ.input_colors[i].from && vue_OBJ.input_colors[i].to) {
              // console.log(vue_OBJ.input_colors[i]);
              var from1 = parseFloat(
                vue_OBJ.input_colors[i].from.split(",")[0]
              );
              var from2 = parseFloat(
                vue_OBJ.input_colors[i].from.split(",")[1]
              );
              var to1 = parseFloat(vue_OBJ.input_colors[i].to.split(",")[0]);
              var to2 = parseFloat(vue_OBJ.input_colors[i].to.split(",")[1]);

              radial.from(from1, from2).to(to1, to2);
            }
            if (vue_OBJ.input_colors[i].radius) {
              radial.radius(vue_OBJ.input_colors[i].radius);
            }

            this.path_objects[i].fill(radial);
            break;
          default:
            console.log(i, "other type");
            break;
        }
      }
    },
    create_splits() {
      for (
        var collection = 0;
        collection < Object.keys(this.input_path).length;
        collection++
      ) {
        // console.log("collection:", collection);
        this.input_fronts[collection] = [];
        this.input_numbers[collection] = [];
        for (var indx = 0; indx < this.input_path[collection].length; indx++) {
          this.input_fronts[collection].push(
            this.extract_fronts(this.input_path[collection][indx])
          );
          this.input_numbers[collection].push(
            this.extract_numbers(this.input_path[collection][indx])
          );
        }
      }
      // console.log(this.input_path, this.input_fronts);
      // console.log( this.input_path[0], this.input_fronts[0], this.input_numbers[0]
      // );
    },
    extract_fronts(sir) {
      var rez = sir;
      rez = this.findAndReplace(rez, "0", "");
      rez = this.findAndReplace(rez, "1", "");
      rez = this.findAndReplace(rez, "2", "");
      rez = this.findAndReplace(rez, "3", "");
      rez = this.findAndReplace(rez, "4", "");
      rez = this.findAndReplace(rez, "5", "");
      rez = this.findAndReplace(rez, "6", "");
      rez = this.findAndReplace(rez, "7", "");
      rez = this.findAndReplace(rez, "8", "");
      rez = this.findAndReplace(rez, "9", "");
      rez = this.findAndReplace(rez, ".", "");
      rez = this.findAndReplace(rez, "-", "");
      return rez;
    },
    extract_numbers(sir) {
      var rez = sir;
      rez = this.findAndReplace(rez, "z", "");
      rez = this.findAndReplace(rez, "Z", "");
      rez = this.findAndReplace(rez, "m", "");
      rez = this.findAndReplace(rez, "M", "");
      rez = this.findAndReplace(rez, "c", "#");
      rez = this.findAndReplace(rez, "C", "#");
      rez = this.findAndReplace(rez, " ", "#");
      rez = this.findAndReplace(rez, ",", "#");
      rez = rez.split("#");
      for (var i = 0; i < rez.length; i++) {
        rez[i] = parseFloat(rez[i]);
      }
      return rez;
    },
    findAndReplace(string, target, replacement) {
      var i = 0,
        length = string.length;
      for (i; i < length; i++) {
        string = string.replace(target, replacement);
      }
      return string;
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
  height: 500px;
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