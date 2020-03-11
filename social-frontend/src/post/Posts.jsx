import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultProfile from '../images/user.png'
import {Link} from 'react-router-dom'

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  }

  renderPosts = posts => (
    <div style={{ color: "#262626" }} className="row">
      {posts.map((post, i) => (
        <div className="col-md-4 mb-2" key={i}>
            <div className="card">
      <div className="card-body"></div>
          {/* <img className="card-img-top" src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
          onError={i=> (i.target.src= `${DefaultProfile}`)}
          alt={user.name} style={{width: '100%', height: '15vw', objectFit: 'cover' }} />
         */}
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">
             {post.body}
            </p>
            <Link to={`/post/${post._id}`} className="btn btn-raised btn-sm btn-primary">
           Read more
            </Link>
          </div>
        </div>
        </div> 
     
      ))}
     
    </div>
  );

  render() {
    const { posts } = this.state;
  
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Recent Posts</h2>

        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default Posts;
