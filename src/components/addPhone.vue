<template>
  <div>
    <el-dialog title="申请添加5G手机评价分析" :visible.sync="dialogFormVisible" @close="close">
      <el-input placeholder="具体的手机型号名称" v-model="phone_name"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click=close>取 消</el-button>
        <el-button type="primary" @click=submit>确 定</el-button>
      </div>
    </el-dialog>
    <Vcode :show="isShow"  @success="success" @close="verify_close" successText="验证通过，已发送添加申请"/>
  </div>
</template>

<script>
import Vue from 'vue'
import {Button, Dialog, Input, Autocomplete} from 'element-ui'
import Vcode from 'vue-puzzle-vcode'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component(Button.name, Button)
Vue.component(Dialog.name, Dialog)
Vue.component(Input.name, Input)
Vue.component(Autocomplete.name, Autocomplete)
Vue.component('Vcode', Vcode)
export default {
  name: 'addPhone',
  data () {
    return {
      dialogFormVisible: false,
      phone_name: '',
      temp_phone_name: '',
      isShow: false
    }
  },
  component: {
    Vcode
  },
  methods: {
    open () {
      this.dialogFormVisible = true
    },
    close () {
      this.phone_name = ''
      this.dialogFormVisible = false
    },
    submit () {
      this.dialogFormVisible = false
      this.isShow = true
      this.temp_phone_name = this.phone_name
    },
    success () {
      this.isShow = false
      this.close()
      this.$axios({
        method: 'get',
        url: '/api/apply/insert',
        params: {
          name: this.temp_phone_name
        }
      })
    },
    verify_close () {
      this.isShow = false
      this.dialogFormVisible = true
    }
  },
  mounted () {
    this.dialogFormVisible = false
    this.phone_name = ''
    this.isShow = false
  }
}
</script>
