import { createStore } from 'vuex'

export default  createStore({
    state: {
      user:'',
      name: 'test',
      age: 8
    },
    mutations: {
      increment(state){
        state.age++
      },
      login(state,payload){
        state.user = payload.user
        localStorage.setItem('user',state.user)
      }
    },
})
