<template>
  <div>
    <el-input type="password" v-model="newPassword" auto-complete="off" placeholder="请输入旧密码" style="width: 30%; margin-top: 5%"/>
    <br>
    <el-input type="password" v-model="newPassword" auto-complete="off" placeholder="请输入新密码" style="width: 30%; margin-top: 3%"/>
    <br>
    <el-input type="password" v-model="newPassword" auto-complete="off" placeholder="请再次输入新密码" style="width: 30%; margin-top: 3%"/>
    <br>
    <el-button style="margin-top: 3%; width: 30%" type="primary" @click="concern">确 定</el-button>
  </div>
</template>

<script>
import Vue from 'vue'
import {Button, Select, Input, Autocomplete} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component(Button.name, Button)
Vue.component(Input.name, Input)

export default {
  name: 'change_password',
  data () {
    return {
      newPassword: ''
    }
  },
  components: {},
  methods: {
    concern () {
      return 0
    }
  },
  mounted () {
    this.newPassword = ''
  }
}

</script>

<style scoped>

</style>
