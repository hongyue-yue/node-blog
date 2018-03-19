import React from 'react'
import ReactDOM from 'react-dom'
import {Provider,connect} from 'react-redux'

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
  withRouter
} from 'react-router-dom'

import { spring , AnimatedSwitch } from 'react-router-transition';
import Bundle from '@/containers/Bundle.js'

import IndexContainer from 'bundle-loader?lazy&name=IndexContainer!@/containers/IndexContainer'
import LoginContainer from 'bundle-loader?lazy&name=LoginContainer!@/containers/LoginContainer'
import ReleaseContainer from 'bundle-loader?lazy&name=ReleaseContainer!@/containers/ReleaseContainer'
import store from "@/redux/store"
import 'normalize.css/normalize.css'
import '@/style/style.scss'

import App from '@/containers/App.js' 

const Loading = function () {
    return <div>Loading...</div>
}
const mapStyles=(styles)=>{
   return {
     opacity:styles.opacity,
     transform: `translate3d(${styles.left}%,0,0)`,
  };
}
const bounce=(val)=>{
   return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}
const animate={
   atEnter: {
       left: 100,
       opacity:0,
   },
   atLeave: {
      left: bounce(-100),
      opacity:bounce(0),
   },
   atActive: {
      left: bounce(0),
      opacity:bounce(1),
   },
}
const createComponent = (component) =>
    () =>  (
            <Bundle load={component}>
                {
                    (Async) => Async?<Async />:<Loading/>
                }
            </Bundle>
        )


ReactDOM.render(
     <Provider store={store}>
        <Router >
          <App>
             <AnimatedSwitch
               atEnter={animate.atEnter}
               atLeave={animate.atLeave}
               atActive={animate.atActive}
               mapStyles={mapStyles}
               className="route-wrapper"
             >
               <Route exact  path="/" component={createComponent(IndexContainer)}/>
               <Route  path="/login"  component={createComponent(LoginContainer)}/>
               <Route  path="/reg"  component={createComponent(ReleaseContainer)}/>
             </AnimatedSwitch>
          </App>
        </Router>
     </Provider>,
    document.getElementById("app")
)
