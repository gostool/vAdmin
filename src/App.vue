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
// import HelloWorld from './components/HelloWorld.vue'
import axios from "axios";
export default {
  data() {
    return {
      msg: { "code": 0, "message": "", "data": { "Reply": "" } },
    };
  },
  methods: {
    go() {
      var _this = this;
      const service = axios.create({
        baseURL: "http://127.0.0.1:8000", // url = base url + request url
        // withCredentials: true, // send cookies when cross-domain requests
        timeout: 5000, // request timeout
      });
      service
        .get("/hello", {
          params: {
            Name: 12345,
          },
        })
        .then(function (response) {
          // http status
          if (response.status != 200) {
            console.log(response);
            return
          }
          // 获取业务数据
          _this.msg = response.data;
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
