<template>
    <div>detail {{query}}</div>
    <button class="button"  @click="changeColor">color:{{color}}</button>
    <!-- <el-button @click="add">点我{{num}}</el-button> -->
    <detail-item @detailClick="detailClick" :msg1="color" title="test" v-model="color" v-model:modelValue2="color"></detail-item>
</template>
<script setup>
    import {ref,provide } from 'vue'
    import {useRoute} from 'vue-router'
    // import {ElButton} from 'element-plus'
    import DetailItem from '../components/DetailItem.vue'
    const route = useRoute()
    const query = route.query
    console.log('query...',query)
    let color = ref('red')
    let changeColor = ()=>{
        color.value = color.value === 'red' ? 'green' : 'red'
    }
    
    let detailClick=(num)=>{
        console.log('detailClick...',num.value)
        if(num.value>5){
            changeColor()
        }
    }

    provide("color", color)

</script>
<style scoped>
.button {
  color: v-bind(color);
}
</style>