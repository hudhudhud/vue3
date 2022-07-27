<template>
<div>
    <p>inner-mod:<input type="text" :value="modelValue" @input="textInput"></p>
    <p>inner-lab:<input type="text" :value="label" @input="textInput2"></p>
    <p>inner-msg:<input type="text" :value="msg" @input="textInput1" @click="msgClick"></p>
</div>
</template>
<script>
export default {
   props: {
    label: String ,
    msg:String,
    modelValue:String,// 以前是`value：String`
    labelModifiers: {//v-model自定义修饰符，默认modelValue的是modelModifiers
      default: () => ({})
    }
  },
  emits: ['clickMsg'],
  data(){
    return {
      
    }
  },
  created() {
    console.log(33,this.labelModifiers) // { capitalize: true }
  },
  methods:{
    textInput: function (e) {
      this.$emit('update:modelValue', e.target.value)
    },
    textInput1: function (e) {
      this.$emit('update:msg', e.target.value)
    },
    textInput2: function (e) {
      let val = e.target.value
      if (this.labelModifiers.capitalize) {
        val = val.charAt(0).toUpperCase() + val.slice(1)
      }
      this.$emit('update:label', val)
    },
    msgClick(){
        this.$emit('clickMsg')
    }
  }
}
</script>
