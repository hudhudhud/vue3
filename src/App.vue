<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div>
    <section>
      <p>mod:<input type="text" v-model="mod" v-focus></p>
      <p>lab:<input type="text" v-model="label"></p>
      <p>msg:<input type="text" v-model="msg"></p>
      <p><Input v-model:label.capitalize="label" v-model:msg="msg" v-model="mod" @clickMsg="msgClick" @click="compClick"/></p>
      <p>count:<input type="text" v-model="count"></p>
      <p><Count v-model:count="count" style="color:red" @click="compClick">123</Count></p>
    </section>
  </div>
</template>

<script>
import Input from './components/Input.vue'
import Count from "./components/Count.vue";
import { nextTick } from 'vue'
export default {
  name: 'App',
  components: {
    Input,
    Count
  },
  data(){
    return {
      label:'',
      msg:'',
      mod:'',
      count:'5'
    }
  },
  watch:{
    $route(to,from){
      document.title = to.meta.title
    }
  },
  mounted(){
    nextTick(()=>{
      console.log(111,document.getElementsByTagName('input').length)
    })
  },
  methods:{
    msgClick(){
      console.log('msg click')
    },
    compClick(){
      console.log('comp click')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
