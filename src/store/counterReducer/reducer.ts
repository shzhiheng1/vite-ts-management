import store from './index.js'

const reducer=(state={...store.state},action:{type:string,val:number})=>{
     // 深copy
   const newState=JSON.parse(JSON.stringify(state))
   for (const key in store.actionNames) {
        if(action.type===key){
            store.actions[key](newState,action)
            break;
        }
   }
   return newState

}
export default reducer