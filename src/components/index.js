// 负责所有全局自定义组件的注册
import PageTools from './PageTools/index'
import UploadExcel from './UploadExcel/index'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools) // 注册工具栏组件
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
  }
}
