<template>
    <div>
        <div class="title">
        <div>
            <label>是否移动端
                <input type="checkbox" v-model="page.isMobile">
            </label>
        </div>
        <div>
            <label>是否测试
                <input type="checkbox" v-model="page.isTest">
            </label>
        </div>
            <h3>会议信息</h3>
            <div>
                <p>主题：<input type="text" name="" id="" placeholder="请输入"></p>
                <p>地点：<input type="text" name="" id="" placeholder="请输入"></p>
                <p>时间：<input type="text" name="" id="" placeholder="请选择"></p>
                <p>参会人：<input type="text" name="" id="" placeholder="请输入"></p>
            </div>
        </div>
         <div class="title">
            <h3>决策事项</h3>
            <button @click="addThing">添加事项</button>
            <div v-for="(item,i) of things" :key="i" class="thing-div" style="border:1px solid;">
                <button @click="delThing(i)">删除事项</button>
                <p>事项：<input type="text" name="" id="" placeholder="请输入" v-model="item.name"></p>
                <!-- true-value 和 false-value 是 Vue 特有的 attributes 且仅会在 v-model 存在时工作 -->
                <input type="checkbox" v-model="item.toggle" :true-value="1" :false-value="0" :id="'toggle_'+i" @change="toggleChange(item)"/>
                <label :for="'toggle_'+i">是否处理</label>
                <div v-for="(it,j) of item.persons" :key="j" class="person-div" style="background-color:rgba(0,0,0,0.1)">
                    <div class="info">
                        <p>基础信息：{{it.user}} {{it.department}}</p>
                        <p v-if="'endTime' in it">预计完成日期：{{it.endTime}}</p>
                    </div>
                    <div><span @click="editPerson(it,item)">编辑</span><span @click="delPerson(j,item,$event)">删除</span></div>
                </div>
                <button @click="addPerson(item,$event)">添加责任人</button>
            </div>
        </div>
        <div class="pop" v-show="editPopVisible">
            <div class="person-dialog">
                <p>责任人:<input type="text"  placeholder="请输入" v-model="temperPerson.user"></p>
                <p>执行部门：<input type="text"  placeholder="请输入" v-model="temperPerson.department"></p>
                <p v-if="'endTime' in temperPerson">预计完成时间<input type="text"  placeholder="请选择" v-model="temperPerson.endTime"></p>
                <p class="btns">
                    <button  @click="editPopVisible=false;savePerson()">确定</button>
                    <button  @click="editPopVisible=false">取消</button>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref,reactive,watch, watchEffect } from 'vue'
let things = reactive([{
    name:'test',
    toggle:'1',
    persons:[{
        id:1,
        user:'张三',
        department:'开发',
        endTime:'2022-10-01'
    }]
}])
let editPopVisible = ref(false)
let currentThing = reactive({}) //用reactive如果后期重新赋值将失去响应，用assign
let temperPerson =ref({})// 用ref后期如果重新赋值，即挂到其value上即可，https://juejin.cn/post/7114596904926740493
/*官方（列表渲染部分）
当遇到的是非变更方法时，我们需要将旧的数组替换为新的：
// `items` 是一个数组的 ref
items.value = items.value.filter((item) => item.message.match(/Foo/))
你可能认为这将导致 Vue 丢弃现有的 DOM 并重新渲染整个列表——幸运的是，情况并非如此。Vue 实现了一些巧妙的方法来最大化对 DOM 元素的重用，因此用另一个包含部分重叠对象的数组来做替换，仍会是一种非常高效的操作。
*/
let addThing = function(){
    things.push({
        name:'',
        toggle:1,
        persons:[{
            user:'',
            department:'',
            endTime:''
        }]
    })
}
let delThing = function(index){
    things.splice(index,1)
}

let addPerson = function(thing){
    Object.assign(currentThing,thing)
    temperPerson.value = {user:'',department:'',endTime:''}
    if(!thing.toggle){
        delete temperPerson.value.endTime
    }
    editPopVisible.value = true
}
let editPerson = function(person,thing){
    Object.assign(currentThing,thing)
    temperPerson.value = JSON.parse(JSON.stringify(person))
    editPopVisible.value = true
}
let delPerson = function(index,thing){
    thing.persons.splice(index,1)
}
let savePerson = function(){
    let newPerson = JSON.parse(JSON.stringify(temperPerson.value))
    if('id' in newPerson){
        let oldPerson = currentThing.persons.find(it=>it.id==newPerson.id)
        oldPerson.user = newPerson.user
        oldPerson.department = newPerson.department
        if(currentThing.toggle){
            oldPerson.endTime = newPerson.endTime
        }
    }
    else{
        newPerson.id=Date.now()
        currentThing.persons.push(newPerson)
    }
    temperPerson.value = {user:'',department:'',endTime:''}
}
let toggleChange = function(thing){
    if(!thing.toggle){
        thing.persons.forEach(it=>{
            delete it.endTime
        })
    }
    else {
        thing.persons.forEach(it=>{
            it.endTime = ''
        })
    }
}
let page = reactive({isMobile:true,isTest:true})
//watch 只追踪明确侦听的源。
watch(()=>page.isMobile,(val,old)=>{
    if(val){
        console.log('true')
    }
    else{
        console.log('false')
    }
},
{
    flush: 'post' 
    // 默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新之前被调用。
    // 这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。
    // 如果想在侦听器回调中能访问被 Vue 更新之后的DOM，你需要指明 flush: 'post' 选项
})
//watchEffect，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式 property。
watchEffect(() => {
    if(page.isMobile){
        console.log('true1')
    }else{
        console.log('false1')
    }
    if(page.isTest){
        console.log('test...')
    }else{
        console.log('test...over')
    }
})
</script>
<style lang="stylus" scoped>
html,body{
    width:100%;
    height:100%;
    margin:0;
    padding:0;
}
.pop{
    position:fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background-color:rgba(0,0,0,0.5);
    z-index:999;
}
.person-dialog{
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width:300px;
    height:200px;
    border-radius:5px;
    background-color:#fff;
    padding:10px;
    .btns{
        text-align:center;
    }
}
</style>