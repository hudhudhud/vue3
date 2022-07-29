<template>
    <div>
        <div class="title">
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
                <div v-for="(it,j) of item.persons" :key="j" class="person-div" style="background-color:rgba(0,0,0,0.1)">
                    <div class="info">
                        <p>基础信息：{{it.user}} {{it.department}}</p>
                        <p>预计完成日期：{{it.endTime}}</p>
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
                <p>预计完成时间<input type="text"  placeholder="请选择" v-model="temperPerson.endTime"></p>
                <p class="btns">
                    <button  @click="editPopVisible=false;savePerson()">确定</button>
                    <button  @click="editPopVisible=false">取消</button>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref,reactive,watch } from 'vue'
let things = reactive([{
    name:'test',
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
let addThing = function(){
    things.push({
        name:'',
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
        oldPerson.endTime = newPerson.endTime
    }
    else{
        newPerson.id=Date.now()
        currentThing.persons.push(newPerson)
    }
    temperPerson.value = {user:'',department:'',endTime:''}
}

watch(editPopVisible,(val)=>{
    // if(val){
    //     document.body.classList.add('full-bg')
    // }
    // else{
    //     document.body.classList.remove('full-bg')
    // }
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