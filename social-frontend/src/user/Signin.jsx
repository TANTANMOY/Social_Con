import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {signin,authenticate} from '../auth/index'

import '../css/backcss.css'

// const styletag ={backgroundColor: "#262626",width: "100em",height: "100%"}




 class Signin extends Component {

    constructor() {
        super()
        this.state={
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false      
         }
    }


    handleChange = (name) =>event=> {
        this.setState({error: ""});
        this.setState({[name]:event.target.value})
    }


   

    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading: true})
        const {email,password} = this.state
        const user = {
            email,
            password
        };
        // console.log(user)
        signin(user)
      .then(data=> {
          if(data.error)
            { 
                this.setState({error: data.error,loading: false})
            }
          else 
           {
               //authenticate 
                authenticate(data,() => {
                    this.setState({redirectToReferer: true})
                })

           }
           
      })
    }

   
    SigninForm = (email,password)=> (
        <form>
        <div className="form-group">
        <label className="text-muted">Email</label>
        <input  onChange={this.handleChange("email")}type="email" className="form-control"value={email}/>
        </div>
        <div className="form-group">
        <label className="text-muted">Password</label>
        <input  onChange={this.handleChange("password")}type="password" className="form-control"value={password}/>
        </div>
        <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">submit</button>
       
    </form>
    )
    render() {
        const {email,password,error, redirectToReferer,loading} = this.state
        if(redirectToReferer) {
            return <Redirect to="/" />
        }
        return (
           <div>
            <div className="container">
            <h2 className="mt-5 mb-5">Signin</h2>
            <div className="alert alert-danger" style={{display: error ? "": "none"}}>
                {error}
            </div>
          
       {
           loading ? (<div className="jumbotron text-center">Loading....</div>) : ("")
       }
        {this.SigninForm(email,password)}
        
        </div>
            </div>
           
        )
    }
}


export default Signin