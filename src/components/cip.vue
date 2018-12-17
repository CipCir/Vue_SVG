<template>
  <div id="appConteiner">
    <div id="Modulecontainer">

    
    <svg :width="chartWidth" :height="chartHeight" id="SVGtag">
       <defs>
            <marker id="red-arrowhead" viewBox="0 0 10 10" refX="7" refY="5"  markerWidth="8" markerHeight="8" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" stroke="none" fill="#000000"/>
            </marker>
        </defs>
      <!-- draw rectangles -->
          <!-- <g v-for="(rct,index) in rectangles" :key="index"> -->
          <rect       
          v-for="(rct,index) in rectangles" :key="index"     
            :id="'r'+rct.idRow+'c'+rct.idCol"    
            :x="rct.x" 
            :y="rct.y"
            :width="rectWidth" 
            :height="rectHeight"            
            class="myRect" 
            
          />
        

    </svg>
 
 
    </div>
   
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      DimObj:{
          VertTexts:{low:"low",high:"high"}
          },
      rectangles: [],
      MyPath: "",
      chartHeight: 300,
      chartWidth: 300,

      rectNum: 10,
      rectWidth: 50,
      rectHeight: 50
    };
  },
  created() {    

    this.SetDimensions();
    this.Generate();
    
  },
  methods: {
    SetDimensions() {
      var contWidth = 900;
      var mySize;
      if (contWidth < 700) {
        mySize = contWidth * 0.98;
      } else {
        // mySize = contWidth * 0.4;
        mySize = contWidth * 0.6;
      }
      //check for height
      if (mySize > $(window).height()) {
        mySize = $(window).height() * 0.7;
      }

      // console.log(mySize);
      this.chartWidth = mySize;
      this.chartHeight = mySize;

    },
    Generate() {
      var rectSize = this.chartWidth / this.rectNum; //100
      rectSize -= 10;
      this.rectWidth = rectSize;
      this.rectHeight = rectSize;

      var newRectSize = 8;
      this.rectWidth = newRectSize + "%";
      this.rectHeight = newRectSize + "%";
      var row, col;      

      var Xstart = 18;
      var Ystart = 2;

      var data_x, data_y, data_CX, data_CY;

      for (row = 0; row < this.rectNum; row++) {
        // data_x = myX + rectSize * row;
        data_x = Xstart + newRectSize * row;
        data_CX = data_x + newRectSize / 2;

        for (col = 0; col < this.rectNum; col++) {
          data_y = Ystart + newRectSize * col;
          data_CY = data_y + newRectSize / 2;
          // debugger;
          this.rectangles.push({
            x: data_x + "%",
            y: data_y + "%",
            CX: data_CX + "%",
            CY: data_CY + "%",
            Slcted: false,
            idCol: row + 1,
            idRow: 11 - (col + 1), //reverse row
            Disabled: row + 1 != 1 //row != 0,
          });
        }
      }
    }}
};
</script>

<style scoped>

#appConteiner {  
  text-align: center;  
}

.myRect {
  fill: #89d6d4; /* #49bfbc;*/
  stroke-width: 1;
  /* stroke: rgb(0, 0, 0); */
  stroke: #b3b3b3;
  cursor: pointer;
}
.myRect:hover:not(.noSelect) {
  fill: #7861af;
}


svg {
  /* background-color: lightblue; */
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
}

.verticalAlign {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
