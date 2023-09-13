
type arrType=string|number|boolean
const store={
   state:{
      arr:[]
   },
   actions:{
      addArr(newState:{arr:Array<number | string | boolean>},action:{type:string,val:arrType}){
        newState.arr.push(action.val)
      }
   },
   actionNames:{}
}
const actionNames={}
for (const key in store.actions) {
    actionNames[key]=key
}
store.actionNames=actionNames
export default store