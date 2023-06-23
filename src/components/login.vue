<template>
  <div class="login-page">
    <el-card class="box-card">
      <div class="login-form">
        <span class="login-title">🔐后台管理系统登录</span>
      </div>
      <div class="login-form">
        <el-form :model="form" :rules="loginRules" ref="loginForm">
          <el-form-item prop="userName">
            <el-input type="text" v-model="form.userName" auto-complete="off" placeholder="请输入用户名" style="margin-top: 5%">
              <template slot="prepend"><i style="font-size:20px" class="el-icon-user"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input type="password" v-model="form.passWord" auto-complete="off" placeholder="请输入密码" style="margin-top: 5%">
              <template slot="prepend"><i style="font-size:20px" class="el-icon-key"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%; margin-top: 5%" type="primary" @click="handleLogin" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import {Button, Input, Card, Form, FormItem} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component(Button.name, Button)
Vue.component(Form.name, Form)
Vue.component(Input.name, Input)
Vue.component(Card.name, Card)
Vue.component(FormItem.name, FormItem)
export default {
  name: 'login',
  data () {
    return {
      loading: false,
      is_load: false,
      form: {
        userName: '',
        passWord: ''
      },
      loginRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码应为6-16位的长度', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if (this.form.userName === 'softWare' && this.form.passWord === '520520') {
            this.is_load = true
            window.sessionStorage.setItem('is_load', this.is_load)
            this.$router.push({path: '/manage'})
          } else {
            alert('用户名或密码不正确')
          }
        } else {
          alert('用户名或密码格式不正确')
          this.loading = false
        }
      })
    },
    init_page () {
      this.loading = false
      this.is_load = false
      this.form.passWord = ''
      this.form.userName = ''
    }
  },
  mounted () {
    this.init_page()
  }
}
</script>

<style scoped>
.login-page{
  height: 40%;
  width:  30%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.login-title{
  font-size: 20px;
}

.box-card {
  width: 375px;
}

.login-form {
  margin-top: 5%;
}

</style>

<script setup>
</script>
