<script>
import { ref,h } from 'vue'
import Count from '../components/Count.vue'

export default {
    props:{
        conf:{
            type:Object,
            required:true,
        }
    },
    setup(props) {

        // 返回渲染函数
        return () => 
        h(
            'div', // type
            { id: 'foo', class: 'bar',props ,onClick: () => {console.log('hello')}}, // props
            [
                /* children */
                h('span',{style:'color:pink'} ,props.conf.a+props.conf.b),
                <Count count={props.conf.count} nativeOnClick={(event)=>{console.log('i m Count');event.stopPropagation();}}></Count>,
                (new Array(10)).fill(true).map((it,i)=>{
                    return <div>{props.conf.a>5? <p style="color:red">a is {props.conf.a} {i+1}</p>: <p style="color:blue">a is {props.conf.a} {i+1}</p>}</div>
                })
            ]
        )
        // return () => <Count count={props.conf.count}></Count>
    }
}
</script>
