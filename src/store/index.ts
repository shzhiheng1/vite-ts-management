import {legacy_createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './reducer.js' 

// 环境变量，仅dev环境启用composeWithDevTools
const mode=import.meta.env.MODE
let enhancers;
if(mode==='dev'){
    enhancers =  composeWithDevTools(
        // applyMiddleware(...middleware)
        // other store enhancers if any
    );
}
// 创建 Store
const store=legacy_createStore(reducer,enhancers)

// const store=legacy_createStore(reducer)
export default store



