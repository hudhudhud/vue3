<template>
<div>
    <button @click="login">点击登录</button>
</div>
</template>
<script setup>
import {useRouter,useRoute} from 'vue-router'
import {useStore} from 'vuex'

const router = useRouter()
const route = useRoute()
const query = route.query
const store = useStore()

function login(){
    store.commit('login',{user:'hd'})
    if(query.redirect){
        console.log('login...',query.redirect)
        router.push(query.redirect)
    }
    else{
        router.push('/')
    }
}
</script>