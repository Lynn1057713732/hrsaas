// 负责所有全局自定义组件的注册
import PageTools from './PageTools/index'
import UploadExcel from './UploadExcel/index'
import ImageUpload from './ImageUpload/index'
import Print from 'vue-print-nb'

export default {
  install(Vue) {
    Vue.component('PageTools', PageTools) // 注册工具栏组件
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
    Vue.component('ImageUpload', ImageUpload) // 注册图片上传组件
    Vue.use(Print)
  }
}
