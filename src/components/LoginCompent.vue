<template>
  <div class="login-container">
    <el-form ref="ruleFormRef" 
    :model="ruleForm" 
    status-icon 
    :rules="rules" 
    label-width="120px" 
    class="login-form" label-position="left">
    <div class="title-container">
        <h3 class="title">admin</h3>
    </div>
    <el-form-item label="账号" prop="name">
      <span class="svg-container">
          <svg-icon icon-class="user" />
      </span>
      <el-input v-model="ruleForm.name" 
      autocomplete="true"
      placeholder="Username"
      tabindex="1"
       />
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <span class="svg-container">
            <svg-icon icon-class="password" />
      </span>
      <el-input 
      v-model="ruleForm.pass" 
      type="password" 
      autocomplete="off"
      placeholder="Password"
      tabindex="2" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import { login } from "@/api/user";
import { defineComponent, reactive, ref } from "vue";
import { ElMessage } from 'element-plus'
export default defineComponent({
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
    const submitForm = (formEl) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          console.log('submit!')
          const { pass, name } = ruleForm
          const data = { name: name, password: pass };
          login(data)
            .then(function (res) {
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
              // redirect to home page
              console.log(res.data)
            })
            .catch(function (error) {
              console.log(error);
            });
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
    return {
      ruleForm, ruleFormRef, rules, submitForm, resetForm
    }
  }
})
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

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
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
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
