<template>
  <div>
	<div>msg1:{{props.msg1}}</div>
	<div><input type="text" :value="props.modelValue" @input="inputChange"></div>
	<div><input type="text" :value="props.modelValue2" @input="inputChange2"></div>
    <el-button @click="add">点我{{num}}</el-button>
  </div>
</template>
<script setup>
	import {ref,defineProps,useAttrs, watch} from 'vue'
	import {ElButton} from 'element-plus'	
	//通信方式1：prop
	let props = defineProps({
		msg1: String,
		modelValue:String,
		modelValue2:String
	})
	console.log('detailItem...props',props) 
	//通信方式2：emit
	let emit = defineEmit()
	console.log('9999...',emit)
	let num = ref('3')
	let add = ()=>{
		num.value ++	
		emit("detailClick", num)
		// emit('update:modelValue',num.value+'')
	}   

	//通信方式3：attrs,包含父作用域里除 class 和 style 除外的非 props 属性集合
	const attrs = useAttrs()
    console.log('detailItem...attrs',attrs) // { title: "test" }

	//通信方式4：多个v-model
	let color = ref('red')
	// watch(color,(v)=>{
	// 	console.log('input color change...',v)
	// 	emit('update:modelValue',v)
	// })
	let inputChange = (e)=>{
		color.value=e.target.value
		// console.log('input color change...',color)
		emit('update:modelValue',color.value)
	}
	let inputChange2= (e)=>{
		color.value=e.target.value
		emit('update:modelValue2',color.value+"2")
	}

	//通信方式5：provide，inject
	import { inject } from "vue"
    const colorName = inject("color")
	watch(colorName,()=>{
		console.log('provide...',colorName.value)
	},{immediate:true})

	//通信方式6：使用vuex
	import {useStore} from 'vuex'
	const store = useStore()
	console.log('store...',store)
</script>

<style scoped>
</style>
