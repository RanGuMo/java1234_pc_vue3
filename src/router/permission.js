import router from "@/router/index";

router.beforeEach((to, from, next) => {
    let token = window.localStorage.getItem('token')
    console.log("token="+token);
    console.log("to.path=" + to.path);
    const whiteList = ['/login'];// 白名单放行
    if (!token) {
        if (!whiteList.includes(to.path))  next("/login")
        next()
    } else {
        if (to.path == "/login") next("/")
        next()
    }
    // 等价上面
    // if (token) {
    //     if (to.path == "/login") {
    //         next('/');
    //     } else {
    //         next();
    //     }
    // } else {
    //     if (whiteList.includes(to.path)) {
    //         next();
    //     } else {
    //         next('/login');
    //     }
    // }
})