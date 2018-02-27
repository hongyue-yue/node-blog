import {combineReducers,createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
//import {routerReducer} from 'react-router-redux'
import * as Reducer from './reducer.js'

/*let store=createStore(
    combineReducers({
          ...Reducer,
         routing: routerReducer
       }),
    applyMiddleware(thunk)
)*/
let store=createStore(
    combineReducers(Reducer),
    applyMiddleware(thunk)
)
export default store
