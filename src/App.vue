<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <button @click="go">change</button>
  <h2>Response</h2>
   <span v-for="(v, k) in msg" :key="k">
            {{k}}:{{v}}
            <br/>
   </span> 
</template>

<script>
import {hello} from "@/api/user"
export default {
  data() {
    return {
      msg: { "code": 0, "message": "", "data": { "Reply": "" } },
    };
  },
  methods: {
    go() {
      var _this = this;
      const params = {"Name":"1234"};
      hello(params)
        .then(function (res) {
          // 获取业务数据
          _this.msg = res;
          if (_this.msg.code != 0) {
            return 
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.setDiv {
  width: 100px;
  height: 100px;
  background-color: green;
  position: absolute;
  left: 0;
  top: 0;
  color: white;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
