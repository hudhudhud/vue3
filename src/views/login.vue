<template>
<div>
    <button @click="login">点击登录</button>
    <section>
        <h3>h test</h3>
        <input type="text" v-model.number="conf.a">
        <input type="text" v-model.number="conf.b">
        <meetingh :conf="conf"></meetingh>
    </section>
</div>
</template>
<script setup>
import {useRouter,useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {ref} from 'vue'
import meetingh from './meetingh.vue'

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


const conf = ref({a:1,b:2,count:100})
</script>