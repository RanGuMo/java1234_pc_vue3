import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '././assets/styles/border.css'
import '././assets/styles/reset.css'
import SvgIcon from '@/icons' 
import "@/router/permission"  //导入全局路由守卫
import locale from 'element-plus/lib/locale/lang/zh-cn'; //element-plus（默认是英文版的） 所以导入中文包

createApp(App).use(store).use(router).use(ElementPlus, { locale }).use(SvgIcon).mount('#app')
