import React, { Component } from 'react'
import {singlePost} from './apiPost'
import DefaultProfile from "../images/posts.jpg";
import { Link } from "react-router-dom";

 class SinglePost extends Component {
     state = {
         post: ''
     }

     componentDidMount = () => {
         const postId = this.props.match.params.postId
        singlePost(postId).then(data => {
            if(data.error) {
                console.log(data.error)
            }else
            {
                this.setState({post:data})
            }
        })
     }

     renderPost = (post) => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : " ";
        const posterName = post.postedBy ? post.postedBy.name : " Unknown";

                return (
                
                    <div className="card">
                      <div className="card-body">
                      <img
                        className="card-img-top"
                        src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={post.title}
                        style={{ width: "auto", height: "300px" }}
                      />
      
                      <div className="card-body">
                     
                        <p className="card-text text-dark">{post.body}</p>
                        <br />
                        <p className="font-italic mark text-dark">
                          Posted by <Link to={`${posterId}`}>{posterName} </Link>
                          on {new Date(post.created).toDateString()}
                        </p>
                        <Link
                          to={`/`}
                          className="btn btn-raised btn-sm btn-primary"
                        >
                          Back to posts
                        </Link>
                      </div>
                    </div>
                    </div>
               
                );
             
     }
    render() {
        const {post} =this.state
        return (
            <div className="container">
                <h2 className=" mt-2 mb-2">{post.title}</h2>
               
                {
           !post ? (<div className="jumbotron text-center">Loading....</div>) : (
            this.renderPost(post)
           )
       }
             
            </div>
        )
    }
}

export default SinglePost