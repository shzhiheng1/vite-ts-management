

const store={
    state:{
        num:0
    },
    actions:{
        add1(newstate:{num:number}){
            newstate.num++
        },
        add2(newstate:{num:number},action:{val:number}){
            newstate.num+=action.val
        }
    },
    actionNames:{}
}

/**
 * 使用结构变为
 * actionNames={
 *   add1:'add1'
 * }
 * 
 * **/ 
 type obj={
    [id:string]:string
}
const actionNames:obj={};

for (const key in store.actions) {
    actionNames[key] = key;    
}
store.actionNames=actionNames
export default store