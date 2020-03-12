import React, { Component } from "react";
import { singlePost, remove } from "./apiPost";
import DefaultProfile from "../images/posts.jpg";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
class SinglePost extends Component {
  state = {
    post: "",
    deleted: false,
    redirectToHome: false
  };

  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    singlePost(postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ post: data });
      }
    });
  };
  deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;
    remove(postId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ redirectToHome: true });
      }
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (answer) {
      this.deletePost();
    }
  };

  renderPost = post => {
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
            <div className="d-inline-block">
              <Link to={`/`} className="btn btn-raised btn-sm btn-primary">
                Back to posts
              </Link>

              {isAuthenticated().user &&
                isAuthenticated().user._id === post.postedBy._id && (
                  <>
                       <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-sm btn-success ml-2">
                Update Post
              </Link>
                    <button
                      onClick={this.deleteConfirmed}
                      className="btn btn-raised btn-warning btn-sm ml-2"
                    >
                      Delete Post
                    </button>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    if (this.state.redirectToHome) {
      return <Redirect to={`/`} />;
    }
    const { post } = this.state;
    return (
      <div className="container">
        <h2 className=" mt-2 mb-2">{post.title}</h2>

        {!post ? (
          <div className="jumbotron text-center">Loading....</div>
        ) : (
          this.renderPost(post)
        )}
      </div>
    );
  }
}

export default SinglePost;
