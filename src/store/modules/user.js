import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'
// 状态
const state = {
  // 设置token为共享状态 初始化vuex的时候 就先从缓存中读取
  // 设置token初始状态   token持久化 => 放到缓存中
  token: getToken(),
  userInfo: {} // 定义一个空的对象 不是null 因为后边我要开发userInfo的属性给别人用  userInfo.name,null对象会报错
}
// 修改状态
const mutations = {
  setToken(state, token) {
    state.token = token // 将数据设置给vuex
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null // 将vuex的数据置空
    removeToken() // 同步到缓存
  },
  setUserInfo(state, result) {
    // 更新一个对象
    state.userInfo = result // 这样是响应式
    // state.userInfo = { ...result } // 这样也是响应式 属于浅拷贝
    // state.userInfo['username'] = result // 这样才不是响应式
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await login(data) // 拿到token
    context.commit('setToken', result) // 设置token
    // 拿到token说明登录成功
    // setTimeStamp() // 设置当前的时间戳
  },
  // 获取用户资料action
  async getUserInfo(context) {
    const result = await getUserInfo() // result就是用户的基本资料
    const baseInfo = await getUserDetailById(result.userId) // 为了获取头像
    const baseResult = { ...result, ...baseInfo } // 将两个接口结果合并
    // 此时已经获取到了用户的基本资料 迫不得已 为了头像再次调用一个接口
    context.commit('setUserInfo', baseResult) // 将整个的个人信息设置到用户的vuex数据中
    return baseResult // 这里为什么要返回 为后面做权限需要这个结果，留下伏笔
  },
  // 登出操作
  logout(context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户资料
    context.commit('removeUseInfo')
    // 重置路由
    resetRouter() // 重置路由
    // 去设置权限模块下路由为初始状态
    // Vuex子模块怎么调用子模块的action 都没加锁的情况下 可以随意调用
    // 不加命名空间的情况下的 所有的mutations和action都是挂在全局上的 所以可以直接调用
    // 但是加了命名空间的子模块 怎么调用另一个加了命名空间的子模块的mutations
    // 加了命名空间的context指的不是全局的context
    // mutations名称 载荷 payload 第三个参数  { root: true } 调用根级的mutations或者action
    context.commit('permission/setRoutes', [], { root: true })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

