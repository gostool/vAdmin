<template>
  <div class="setDiv" :style="reactiveStyle" @mousedown="mousedown($event)"></div>
</template>

<script>
import { reactive } from '@vue/reactivity';
export default {
  setup(){
    let myDivStyle = {
      "left":0,
      "top":0
    }
    let reactiveStyle = reactive(myDivStyle)
    
    let mousedown = function(event){
      this.needX = event.clientX - parseInt(reactiveStyle.left);
      this.needY = event.clientY - parseInt(reactiveStyle.top);
      document.onmousemove = event => {
        this.x = event.clientX - this.needX;
        this.y = event.clientY - this.needY;
        reactiveStyle.left = this.x + 'px';
        reactiveStyle.top = this.y + 'px';
      };
      document.onmouseup = () =>{
        document.onmousemove = document.onmouseup = null;
      }
    }
    return {
      reactiveStyle, mousedown
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.setDiv {
  width: 100px;
  height: 100px;
  background-color: green;
  position: absolute;
  left: 0;
  top: 0;
}
</style>