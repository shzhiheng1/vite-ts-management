/********通过模板***********/ 
import store from "./index.js"

const reducer=(state={...store.state},action:{type:string,[propsKey:string]:unknown})=>{
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