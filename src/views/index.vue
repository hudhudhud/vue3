<template>
    <div @click="goDetail">detail</div>
    <div @click="goMeeting">meeting</div>
</template>
<script>
import { defineComponent } from 'vue'
import {useRouter} from 'vue-router'

export default defineComponent({
    setup() {
        const router = useRouter()
        console.log(1111,router)
        let goDetail = function(){
            router.push({name:'detail',query:{id:1}})
        }
        let goMeeting = function(){
            router.push({name:'meeting'})
        }
        return {
            goDetail,
            goMeeting
        }
    },
})
</script>
