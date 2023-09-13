import {legacy_createStore,combineReducers,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import counterReducer from './counterReducer/reducer.js'
import arrReducer from './arrReducer/reducer.js'

// 环境变量，仅dev环境启用composeWithDevTools
// const mode=import.meta.env.MODE
// let enhancers;
// if(mode==='dev'){
//     enhancers =  composeWithDevTools(
//         // applyMiddleware(...middleware)
//     );
// }

const enhancers=composeWithDevTools(
    applyMiddleware(thunk)
)
// 合并reducer
const allReducer=combineReducers({
    counterReducer,//...分别写到下面
    arrReducer
})
// 创建 Store
const store=legacy_createStore(allReducer,enhancers)

// const store=legacy_createStore(reducer)
export default store



