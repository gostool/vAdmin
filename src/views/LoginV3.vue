<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" status-icon :rules="rules" class="login-form" label-position="left"
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
                <el-input v-model="loginForm.passport" ref="passport" autocomplete="on" placeholder="Passport"
                    name="passport" type="text" tabindex="1" />
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <el-form-item prop="pass">
                    <span class="svg-container">
                        <svg-icon icon-class="password" />
                    </span>
                    <el-input v-model="loginForm.password" :key="passwordType" ref="passport" :type="passwordType"
                        autocomplete="off" placeholder="Password" tabindex="2" @keyup="checkCapslock"
                        @blur="capsTooltip = false" />
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
            </el-tooltip>

            <el-form-item>
                <span class="svg-container"> </span>
                <el-input v-model="loginForm.captcha" name="logVerify" placeholder="请输入验证码" style="width: 50%" />
                <div class="vPic">
                    <img v-if="picPath" :src="picPath" alt="请输入验证码" @click="loginVefify()" />
                </div>
            </el-form-item>

            <el-form-item>
                <div class="left-space-div"></div>
                <el-button type="primary" :loading="loading" @click="submitForm">Submit</el-button>
                <el-button @click="resetForm">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from "vuex";
// import { ElMessage } from 'element-plus'
import { captcha } from "@/api/tools";
export default defineComponent({
    name: "LoginPage",
    data() {
        const checkUsername = (rule, value, callback) => {
            if (value.length < 3 || value.length > 12) {
                return callback(new Error("请输入正确的用户名"));
            } else {
                callback();
            }
        };
        const checkPassword = (rule, value, callback) => {
            if (value.length < 3 || value.length > 20) {
                return callback(new Error("请输入正确的密码"));
            } else {
                callback();
            }
        };
        return {
            curYear: 0,
            lock: "lock",
            capsTooltip: false,
            loading: false,
            loginForm: {
                passport: "admin",
                password: "123456",
                captcha: "",
                captchaId: "",
            },
            passwordType: "password",
            rules: {
                passport: [{ validator: checkUsername, trigger: "blur" }],
                password: [{ validator: checkPassword, trigger: "blur" }],
            },
            logVerify: "",
            picPath: "",
        };
    },
    created() {
        this.loginVefify();
        this.curYear = new Date().getFullYear();
    },
    methods: {
        ...mapActions("user", ["LoginIn"]),
        async login() {
            console.log("await login---->");
            return await this.LoginIn(this.loginForm);
        },
        async submitForm() {
            this.$refs.loginForm.validate(async (v) => {
                if (!v) {
                    this.$message({
                        type: "error",
                        message: "请正确填写登录信息",
                        showClose: true,
                    });
                    this.loginVefify();
                    return;
                }
                const flag = await this.login();
                if (!flag) {
                    this.$message({
                        type: "error",
                        message: "登陆失败，请检查用户名或密码",
                        showClose: true,
                    });
                    this.resetForm();
                    return
                }
                this.$message({
                    message: '登陆成功',
                    type: 'success'
                });
                this.$router.push("/home");
                return
            });
        },
        showPwd() {
            if (this.passwordType === "password") {
                this.passwordType = "text";
            } else {
                this.passwordType = "password";
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        loginVefify() {
            captcha({}).then((resp) => {
                this.picPath = resp.data.picPath;
                this.loginForm.captchaId = resp.data.captchaId;
                console.log("capthcha");
            });
        },

        checkCapslock(e) {
            const { key } = e
            this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
        },

        resetForm() {
            this.loginForm = {
                passport: "",
                password: "",
                captcha: "",
                captchaId: "",
            };
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

    .vPic {
        width: 30%;
        height: 30px;
        float: right !important;
        background: #ccc;

        img {
            width: 90%;
            height: 100%;
            cursor: pointer;
            vertical-align: middle;
        }
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