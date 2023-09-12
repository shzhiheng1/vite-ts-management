const defaultState={
    num:20
}

const reducer=(state=defaultState,action:{type:string,val:number})=>{
    // console.log(action)
    // 深copy
   const newState=JSON.parse(JSON.stringify(state))
   switch (action.type) {
    case 'add1':
        newState.num++
        break;
    case 'add2':
        newState.num =newState.num + action.val
        break;
    default:
        break;
   }

   return newState
}
export default reducer