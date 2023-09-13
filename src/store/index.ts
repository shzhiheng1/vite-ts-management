import {legacy_createStore,combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import counterReducer from './counterReducer/reducer.js'
import arrReducer from './arrReducer/reducer.js'

// 环境变量，仅dev环境启用composeWithDevTools
const mode=import.meta.env.MODE
let enhancers;
if(mode==='dev'){
    enhancers =  composeWithDevTools(
        // applyMiddleware(...middleware)
    );
}
// 合并reducer
const allReducer=combineReducers({
    counterReducer,//...分别写到下面
    arrReducer
})
// 创建 Store
const store=legacy_createStore(allReducer,enhancers)

// const store=legacy_createStore(reducer)
export default store



