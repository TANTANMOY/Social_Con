import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultProfile from "../images/posts.jpg";
import { Link } from "react-router-dom";

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

  renderPosts = posts => {
    return (
      <div style={{ color: "#262626" }} className="row">
        {posts.map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : " ";
          const posterName = post.postedBy ? post.postedBy.name : " Unknown";

          return (
            <div className="col-md-4 mb-2" key={i}>
              <div className="card">
                <div className="card-body"></div>
                <img
                  className="card-img-top"
                  src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                  onError={i => (i.target.src = `${DefaultProfile}`)}
                  alt={post.title}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.body.substring(0, 100)}...</p>
                  <br />
                  <p className="font-italic mark">
                    Posted by <Link to={`${posterId}`}>{posterName} </Link>
                    on {new Date(post.created).toDateString()}
                  </p>
                  <Link
                    to={`/post/${post._id}`}
                    className="btn btn-raised btn-sm btn-primary"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts } = this.state;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">{!posts.length ? 'Loading...' : "Recent Posts"}</h2>

        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default Posts;
