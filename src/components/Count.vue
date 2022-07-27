<template>
    <p>user:<input type="text" v-model="state.user" ref="inputEle"/></p>
    <p >{{num}} {{state.user}}</p>
    <slot />
    <el-button @click="add" v-bind="$attrs">+</el-button>
    <el-button @click="subtract">-</el-button>
    <Test />
</template>
<script>
import { defineComponent,toRefs,ref,watch,onMounted,reactive,shallowReactive,getCurrentInstance,provide,computed } from 'vue'
import {useStore} from 'vuex'
import Test from './Test'
import {ElButton} from 'element-plus'
export default defineComponent({
    props:{
        count:Number
    },
    components:{
        Test,
        [ElButton.name]:ElButton
    },
    setup(props,{emit,attrs,slots}) {
        //attrs中包括绑定的事件，原$listeners已被移除，包含class&style
        console.log('count...',props.count,attrs,slots)
        //获取实例
        const instance = getCurrentInstance() // 只能在 setup 或生命周期钩子中调用，setup的内部函数也不调用
        console.log(instance,instance.ctx,instance.proxy)
        //调用实例上能访问的 property
        // instance.ctx.$http()

        //使用vuex
        const store = useStore()
        console.log('store...',store)

        const { count } = toRefs(props)
        // let num2 = toRef(props,"count")

        // 创建响应式的数据对象
        let info = {user: 'hudan'}
        const state = reactive(info)//每一层都被Proxy处理
        const state1 = shallowReactive({ //只有第一层被Proxy处理
          a: 1,
          first: {
            b: 2,
            second: {
              c: 3
            }
          }
        })
        
        //用 ref 函数包装一个响应式变量 number,
        //ref 就是通过 reactive 包装了一个对象 ，然后是将值传给该对象中的 value 属性
        //我们可以简单地把 ref(obj) 理解为这个样子 reactive({value: obj})
        let num = ref(props.count)
        // 建议：
        // 基本类型值（String 、Nmuber 、Boolean 等）使用 ref
        // 引用类型值（Object 、Array）使用 reactive

        
        // 3. 设定一个方法
        function add() {
            num.value ++
            console.log('ref..',num)
        }
        function subtract(){
            num.value -- 
            // console.log('toRef..',num2)
        }

        /*watch 接受 3 个参数：
            一个想要侦听的响应式引用或 getter 函数
            一个回调
            可选的配置选项*/
        watch(count, (newValue)=>{
            num.value = newValue
        });
        watch(num, (newValue)=>{
            emit('update:count',newValue)
        });
        watch(()=>state.user, (newValue)=>{
            console.log('state..change..',newValue)
        },{immediate:true,deep:true});

        //创建一个DOM引用，名称必须与元素的ref属性名相同
        let inputEle=ref(null)
        onMounted(()=>{
            // 在挂载后才能通过 el 获取到目标元素
            console.log('mounted...',inputEle,inputEle.value)
            inputEle.value.value='zhangsan'
        })
        
        //组件层级深时，用provide提供属性，而不是props一层层传，子组件在需要的地方inject('name')即取到该属性值
        provide('num',num)//num已经具有响应性
        //需要在子组件修改属性值时，可以传一个修改的函数给子组件
        let updateNum = function(val){
            num.value = val
        }
        provide('updateNum', updateNum)


         // 4. 将 number 和 add 返回出去，供template中使用
        return {
            num,
            add,
            subtract,
            attrs,
            state,
            state1,
            inputEle,
             // 在 computed 函数中访问 state
            name: computed(() => store.state.name),
            // 使用 mutation
            increment: () => store.commit('increment'),
        }
    },
})
</script>
