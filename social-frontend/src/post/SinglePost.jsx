import React, { Component } from "react";
import { singlePost, remove, like, unlike, comment } from "./apiPost";
import DefaultPost from "../images/posts.jpg";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Comment from './Comment'


class SinglePost extends Component {
  state = {
    post: "",
    deleted: false,
    redirectToHome: false,
    redirectToSignin: false,
    like: false,
    likes: 0,
    comments:[]
  };
  checkLike = likes => {
    const userId =isAuthenticated() && isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    singlePost(postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          post: data,
          likes: data.likes.length,
          like: this.checkLike(data.likes),
          comments: data.comments
        });
      }
    });
  };
  
  updateComments = comments => {
    this.setState({comments})
  }

  likeToggle = () => {
    if(!isAuthenticated()) {
      this.setState({redirectToSignin: true})
      return false
    }
    let callAPi = this.state.like ? unlike : like;
    const userId = isAuthenticated().user._id;
    const postId = this.state.post._id;
    const token = isAuthenticated().token;
    callAPi(userId, token, postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          like: !this.state.like,
          likes: data.likes.length
        });
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
      "Are you sure you want to delete your post?"
    );
    if (answer) {
      this.deletePost();
    }
  };

  renderPost = post => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : " ";
    const posterName = post.postedBy ? post.postedBy.name : " Unknown";

    const { like, likes } = this.state;

    return (
      <div className="card">
        <div className="card-body">
          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
            onError={i => (i.target.src = `${DefaultPost}`)}
            alt={post.title}
            style={{ width: "auto", height: "300px" }}
          />

        {like ? ( <h3 className="text-dark mt-2" onClick={this.likeToggle}>
      
      {likes} <i className="fa fa-thumbs-up text-success "></i>
    </h3>) : (
       <h3 className="text-dark mt-2" onClick={this.likeToggle}>
      
       {likes} <i className="fa fa-thumbs-down text-warning "></i>
     </h3>
    ) }
         

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
                    <Link
                      to={`/post/edit/${post._id}`}
                      className="btn btn-raised btn-sm btn-success ml-2"
                    >
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
   
    const{post,redirectToHome,redirectToSignin,comments} = this.state;
    if (this.state.redirectToHome) {
      return <Redirect to={`/`} />;
    }else if(redirectToSignin)
    {
      return <Redirect to={`/signin`} />;
    }
    return (
      <div className="container">
        <h2 className=" mt-2 mb-2">{post.title}</h2>

        {!post ? (
          <div className="jumbotron text-center">Loading....</div>
        ) : (
          this.renderPost(post)
        )}
        <Comment postId={post._id} comments={comments.reverse()} updateComments={this.updateComments}/>
      </div>
    );
  }
}

export default SinglePost;
