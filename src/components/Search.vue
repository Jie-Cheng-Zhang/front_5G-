<template>
  <div>
    <img class="img_search" src="../assets/logo.png"/>
  <div class="input_search">
    <el-autocomplete v-model="msg"
                     class="el_autocomple_search"
                     :fetch-suggestions="querySearchAsync"
                     placeholder="请输入查找的5G手机型号"
                     @select="handleSelect">
      <i slot="suffix" class="el-input__icon el-icon-close" @click="msg=''"></i>
    </el-autocomplete>
  </div>
    <add-phone ref="dialog"></add-phone>
  </div>
</template>

<script>
import Vue from 'vue'
import {Button, Select, Input, Autocomplete} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import addPhone from './addPhone.vue'
import axios from 'axios'
// import {get_hot, search_phone} from "../api/phone_api";

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Input.name, Input)
Vue.component(Autocomplete.name, Autocomplete)

export default {
  name: 'search',
  data () {
    return {
      phone_list: [],
      msg: '',
      Visiable: false
    }
  },
  components: {
    addPhone
  },
  methods: {
    async initload () {
      let list = []
      return list
    },
    async querySearchAsync (queryString, cb) {
      if (this.msg.length === 0) {
        this.phone_list = []
      } else {
        await this.$axios({
          method: 'get',
          url: '/api/phones'
        })
          .then(response => {
            let allList = response.data.data
            const pattern = new RegExp(this.msg, 'i')
            this.phone_list = allList.filter(item => {
              return pattern.test(item.name)
            })
          })
      }
      let results = []
      for (let i of this.phone_list) {
        results.push({
          id: i['id'],
          value: i['name']
        })
      }
      results.push({
        id: '-1',
        value: '请求添加评论分析的手机型号'
      })
      cb(results)
    },
    handleSelect (item) {
      if (item['value'] === '请求添加评论分析的手机型号') {
        this.$nextTick(() => {
          this.$refs.dialog.open()
        })
      } else {
        this.$router.push({
          path: '/search/',
          query: {
            phone_id: item['id'],
            phone_name: item['value']
          }
        })
      }
    }
  },
  mounted () {
    this.phone_list = this.initload()
  }
}
</script>

<style scoped>
.img_search{
  margin-top: 8%;
}

.input_search {
  margin-top: 10%;
  display: flex;
  justify-content: center;
}

.el_autocomple_search{
  width: 50%;
  border-style: solid;
  border-radius: 5px;
}

</style>
