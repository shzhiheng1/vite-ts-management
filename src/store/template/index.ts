/**********模板*************/ 


const store={
    state:{
        // ...初始还state
    },
    actions:{
        // ...action方法
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