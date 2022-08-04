<template>
  <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
    <el-form-item label="账号" prop="name">
      <el-input v-model="ruleForm.name" autocomplete="true" />
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
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
