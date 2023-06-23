<template>
  <div>
    <el-dialog title="是否重新生成分析PDF" :visible.sync="dialogFormVisible" @close="close">
      <span>Tips：重新生成分析PDF所需要时间较长，慎重选择</span>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click=submit_yes>是</el-button>
        <el-button type="primary" @click=submit_not>否</el-button>
      </div>
    </el-dialog>
    <Vcode :show="isShow"  @success="success" @close="verify_close" successText="验证通过"/>
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
      isShow: false,
      submit_type: ''
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
    submit_yes () {
      this.submit_type = '1'
      this.dialogFormVisible = false
      this.isShow = true
    },
    submit_not () {
      this.submit_type = '0'
      this.dialogFormVisible = false
      this.isShow = true
    },
    success () {
      this.isShow = false
      this.close()
      this.$axios({
        method: 'get',
        url: '/api/pdf/generate/start',
        params: {
          id: this.$route.query['phone_id'],
          needRefresh: this.submit_type
        }
      })
        .then(response => {
          let status = response.data.status
          if (status === 'success') {
            alert('申请生成成功')
          } else {
            alert('申请生成失败，页面刷新')
            this.$router.go(0)
          }
          this.$emit('test', '1')
        })
    },
    verify_close () {
      this.isShow = false
      this.dialogFormVisible = true
    }
  },
  mounted () {
    this.dialogFormVisible = false
    this.isShow = false
    this.submit_type = ''
  }
}
</script>
