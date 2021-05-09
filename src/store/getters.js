const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 在根级的getters上 开发子模块的属性给别人看 给别人用
  avatar: state => state.user.userInfo.staffPhoto, // 建立用户头像的映射,用于快捷访问
  name: state => state.user.userInfo.username, // 建立用户username的映射,用于快捷访问
  userId: state => state.user.userInfo.userId, // 建立用户id的映射,用于快捷访问,用于快捷访问
  companyId: state => state.user.userInfo.companyId, // 建立对于user模块的companyId的快捷访问
  routes: state => state.permission.routes // 导出当前的路由
}
export default getters
