import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Profile from './user/Profile'
import Menu from './core/Menu'
import Users from './user/Users'
import EditProfile from './user/EditProfile'
import FindPeople from './user/FindPeople'
import PrivateRoute from './auth/PrivateRoute'
import NewPost from './post/NewPost'

 function MainRouter() {
    return (
        <div>
            <Menu />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={Signin} />
                <PrivateRoute exact path="/user/:userId" component={Profile} />
                <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
                <PrivateRoute exact path="/findpeople" component={FindPeople} />
                <PrivateRoute exact path="/create/post" component={NewPost} />
             
            </Switch>
        </div>
    )
}
export default MainRouter 