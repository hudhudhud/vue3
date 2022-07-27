import { createApp } from 'vue'
import App from './App.vue'
import App2 from './App2.vue'
import store from './store/index'
import router from './router/index'
// import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';


// let app = createApp(App)
// app.directive('focus', {
//     mounted: el => el.focus()
// })
// app.use(store)
// app.config.globalProperties.$http = () => {//等同于vue2的Vue.prototype.$http = () => {}
//     console.log('http called')
// } 
// // app.use(ElementPlus)
// app.mount('#app')

router.beforeEach((to, from, next) => {
    if(to.meta.auth&&!store.state.user){
        let user = localStorage.getItem('user')
        if(user){
            store.commit('login',{user})
            next()
        }
        else{
            next({name:'login',query:{redirect:to.fullPath}})
        }
    }
    next()
})
let app2 = createApp(App2)
app2.use(store)
app2.use(router)
app2.mount('#app2')




//需要共享配置
// const createMyApp = options => {
//     const app = createApp(options)
//     app.directive('focus', /* ... */)
//     return app
// }
// createMyApp(App2).mount('#app2')