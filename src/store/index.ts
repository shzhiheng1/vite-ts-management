import {legacy_createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './reducer.js' 


// 创建 Store
const store = legacy_createStore(reducer, composeWithDevTools(
    // applyMiddleware(...middleware)
    // other store enhancers if any
));


// const store=legacy_createStore(reducer)
export default store



