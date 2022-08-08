<template>
   <LoginCompent></LoginCompent>
</template>

<script>
import LoginCompent from "./components/LoginCompent.vue";
import {login} from "@/api/user"
export default {
  components: { LoginCompent },
  data() {
    return {
      msg: { "code": 0, "message": "", "data": { "Reply": "" } },
    };
  },
  methods: {
    go() {
      var _this = this;
      const data = {"name":"john123", "password":"123456"};
      login(data)
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

html, body, #app {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
