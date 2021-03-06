import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/user.png";
import DefaultPostImage from "../images/posts.jpg";

class ProfileTabs extends Component {
  render() {
    const { following, followers,posts } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4 className="text-primary">Followers</h4>
            <hr />
            <div className="container">

           
            {followers.map((person, i) => {
             return ( <div key={i}>
                <div className="row">
                  <div>
                    <Link to={`/user/${person._id}`}>
                      <img
                        className="float-left mr-2"
                        style={{ height: "30px", width: "30px",borderRadius: "50%",border:"2px solid #262626" }}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                        alt={person.name}
                      />
                       <p className="d-inline-block">{person.name}</p>
                     
                    </Link>

                   {/*do later */}
                    <p style={{clear: "both"}}> {person.about}</p>
                  </div>
               
                </div>
              </div>
             );
            })}
             </div>
          </div>
        
          <div className="col-md-4">
           
            <h4 className="text-primary">Following</h4>
            <hr />
            <div className="container">
            {following.map((person, i) => {
             return ( <div key={i}>
                <div className="row">
                  <div>
                    <Link to={`/user/${person._id}`}>
                      <img
                        className="float-left mr-2"
                        style={{ height: "30px", width: "30px",borderRadius: "50%",border:"2px solid #262626" }}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                        alt={person.name}
                      />
                       <p className="d-inline-block">{person.name}</p>
                     
                    </Link>

                   {/*do later */}
                    <p style={{clear: "both"}}> {person.about}</p>
                  </div>
               
                </div>
              </div>
             );
            })}
            </div>
           
          </div>
       <div className="col-md-4">
       <h4 className="text-primary">Posts</h4>
       <hr/>
       <div className="container">
       {posts.map((post, i) => {
             return ( <div key={i}>
                <div className="row">
                  <div>
                  <img
                        className="float-left mr-2"
                        style={{ height: "30px", width: "30px",borderRadius: "50%",border:"2px solid #262626" }}
                        onError={i => (i.target.src = `${DefaultPostImage}`)}
                        src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                        alt={post.title}
                      />
                    <Link to={`/post/${post._id}`}>
                       <p className="d-inline-block">{post.title}</p>
                     
                    </Link>
                  </div>
               
                </div>
              </div>
             );
            })}
            </div>
       </div>
        </div>
        
      </div>
    );
  }
}

export default ProfileTabs;
