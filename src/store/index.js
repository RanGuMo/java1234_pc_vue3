import { createStore } from 'vuex'
import router from '@/router'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    // 安全退出
    logout() {
      // window.sessionStorage.clear();
      // window.localStorage.clear();
      window.sessionStorage.removeItem("token");
      window.localStorage.removeItem("token");
      router.replace('/login')
    }
  },
  modules: {
  }
})
