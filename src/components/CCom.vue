<template>
  <div class="setDiv">
    {{refA}}
    {{reactiveJson.msg}}
    <button @click="fn">go</button>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const refA = inject("refA", "default data");
    const reactiveJson = inject("reactiveJson", "default data")
    const fn = inject("fn", "default fn")
    return {
      refA, reactiveJson, fn
    }
  },
};
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