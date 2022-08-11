<template>
  <div class="login-container">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="login-form" label-position="left"
      autocomplete="on">
      <div class="title-container">
        <span class="svg-container">
          <svg-icon icon-class="star" />
        </span>
        <span class="title">admin</span>
      </div>

      <el-form-item prop="name">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="ruleForm.name" ref="username" autocomplete="on" placeholder="Username" name="username"
          type="text" tabindex="1" />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="pass">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model="ruleForm.pass" :key="passwordType" ref="password" :type="passwordType" autocomplete="off"
            placeholder="Password" tabindex="2" @keyup="checkCapslock" @blur="capsTooltip = false" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-form-item>
        <div class="left-space-div"></div>
        <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, getCurrentInstance } from "vue";
import { ElMessage } from 'element-plus'
export default defineComponent({
  methods:{
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
  setup() {
    const ruleForm = reactive({
      pass: '',
      name: '',
    });
    const ruleFormRef = ref();
    const rules = reactive({
      pass: [{ required: true, trigger: 'blur' }],
      name: [{ required: true, trigger: 'blur' }],
    });
    const passwordType = ref('password')
    const capsTooltip = ref(false)
    const submitForm = (formEl) => {
      if (!formEl) return
      formEl.validate((valid) => {
        console.log(valid, formEl)
        if (valid) {
          this.loading = true
          const { pass, name } = ruleForm
          const data = { name: name, password: pass };
          this.$store.dispatch('user/login', data)
            .then((res) => {
              // 获取业务数据
              console.log("login业务数据:", res)
              if (res.code != 0) {
                ElMessage({
                  message: res.message || '账号或密码错误，请重试',
                  type: 'error',
                  duration: 5 * 1000
                })
                return
              }
              console.log("登陆成功")
              this.$router.push("/home");
              this.loading = false
            })
            .catch((error) => {
              this.loading = false
              console.log(error);
            })
        } else {
          console.log('error submit!')
          return false
        }
      })
    };

    const resetForm = (formEl) => {
      if (!formEl) return
      formEl.resetFields()
    };
    const checkCapslock = (e) => {
      const { key } = e
      capsTooltip.value = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    };
    let { ctx } = getCurrentInstance();
    const showPwd = () => {
      if (passwordType.value === 'password') {
        passwordType.value = ''
      } else {
        passwordType.value = 'password'
      }
      ctx.$nextTick(() => {
        ctx.$refs.password.focus()
      })
    };
    return {
      ruleForm, ruleFormRef, rules, submitForm, resetForm,
      passwordType, capsTooltip, checkCapslock, showPwd
    }
  }
})
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  background-image: url("/src/assets/backgound.png");
  background-size: 100% 100%;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .el-input {
    width: 80%;
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    // position: absolute;
    // top: 7px;
    padding: 6px 5px 6px 15px;
    width: 30px;
    // right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .left-space-div {
    width: 50px;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
