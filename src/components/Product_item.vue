<template>
  <div>
    <el-button style="float: right" type="primary" @click="downloadPDF">
      <p v-if="isGenerate">下载分析PDF</p>
      <p v-if="isPreview">预览分析PDF</p>
    </el-button>
    <produce-p-d-f ref="dialog" @test="testMethod"></produce-p-d-f>
  </div>
</template>

<script>
import Vue from 'vue'
import {Button, Select, Input, Autocomplete} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import producePDF from './produce_pdf.vue'

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Input.name, Input)
Vue.component(Autocomplete.name, Autocomplete)

export default {
  name: 'productItem',
  data () {
    return {
      isPreview: false,
      isGenerate: true
    }
  },
  components: {
    producePDF
  },
  methods: {
    async downloadPDF () {
      console.log(this.$route.query)
      if (this.isGenerate) {
        this.$nextTick(() => {
          this.$refs.dialog.open()
        })
      } else {
        this.$axios({
          method: 'get',
          url: '/api/pdf/generate/status',
          params: {
            id: this.$route.query['phone_id']
          }
        })
          .then(response => {
            let status = response.data.msg
            if (status === 'pdf正在生成中') {
              alert(status)
            } else {
              const httpPath = 'http://localhost:5000/pdf/preview?id='+this.$route.query['phone_id']
              window.open(httpPath, '_blank')
            }
          })
      }
    },
    async testMethod (signal) {
      if (signal === '1') {
        this.isGenerate = false
        this.isPreview = true
      }
    }
  },
  mounted () {
    this.isPreview = false
    this.isGenerate = true
  }
}
</script>

<style scoped>

</style>
