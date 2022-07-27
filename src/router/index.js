import {createRouter,createWebHashHistory} from 'vue-router'
// import { defineAsyncComponent } from 'vue'

const router = createRouter({
    "history": createWebHashHistory(),
    routes: [
        { path: '/login', name: 'login', component:(()=>import('../views/login')),meta:{title:'login'}},
        { path: '/', name: 'index', component:(()=>import('../views/index')),meta:{title:'index',auth:true}},
        // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
        { path: '/:pathMatch(.*)*', name: 'index', component:(()=>import('../views/index')),meta:{title:'index',auth:true}},
        { path: '/detail', name: 'detail', component: (()=>import('../views/detail')),meta:{title:'detail'}},
        { path: '/meeting', name: 'meeting',component: (()=>import('../views/meeting')),meta:{title:'meeting',auth:true}},
    ],
})


export default router