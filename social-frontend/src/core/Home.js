import React from 'react'
import Posts from '../post/Posts'

const Home =()=> (
        
    <div>
    <div className="jumbotron" style={{borderRadius: "0px"}}>
                <h2 style={{color: "#262626"}}>Home </h2>
                
            </div>
            <div className="container">
                <Posts />
            </div>
    </div>
        
      
)

export default Home