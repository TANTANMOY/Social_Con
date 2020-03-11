import React from "react";
import { Link,withRouter } from "react-router-dom";
import {signout, isAuthenticated} from '../auth/index'

const isActive = (history,path) => {
    if(history.location.pathname === path )
     return {color: "#ff9900"}
    else
    return {color: "#ffffff"}
}


const Menu = ({history}) => {
 return <div>
    <ul className="nav nav-tabs bg-secondary ">
      <li className="nav-item">
        <Link className="nav-link" to="/" style={isActive(history, "/")}>Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/users" style={isActive(history, "/users")}>Users</Link>
      </li>
    {!isAuthenticated() && (
        <>
 <li className="nav-item">
          <Link className="nav-link" to="/signin" style={isActive(history, "/signin")}>sign in</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup" style={isActive(history, "/signup")}>sign up</Link>
        </li>
      
        </>
         
    )}
     {isAuthenticated() &&(
         <>
           <li className="nav-item ">
         
         <Link  to={`/create/post`} style={isActive(history, "/create/post")} className="nav-link ">
         Create Post
         </Link>
        
     </li>
         <li className="nav-item ">
         
           <Link className="nav-link " to={`/user/${isAuthenticated().user._id}`} style={isActive(history, `/user/${isAuthenticated().user._id}`)}>
           {`${isAuthenticated().user.name}'s profile`}
           </Link>
          
       </li>
       <li className="nav-item ">
         
         <Link  to={`/findpeople`} style={isActive(history, "/findpeople")} className="nav-link ">
         findpeople
         </Link>
        
     </li>
    
       <li className="nav-item">
          <span className="nav-link"onClick={() => signout(() => history.push('/'))} style={(isActive(history, "/signout"), {cursor: "pointer",color: "#fff"})}>sign out</span>
        </li>
       </>
     )}
    </ul>
  </div>
};

export default withRouter(Menu);
