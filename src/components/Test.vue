<template>
    <div @click="add">test inject  {{num}}</div>
</template>
<script>
import { defineComponent , inject } from 'vue'

export default defineComponent({
    setup() {
        let num =  inject('num',666)//属性名称、默认值
        let updateNum = inject('updateNum')
        let add = function(){
            num.value++
            updateNum(num.value)
        }
        return {
            num,
            add
        }
    },
})
</script>
