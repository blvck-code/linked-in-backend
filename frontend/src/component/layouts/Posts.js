import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPost } from "../../actions/posts";
import img from "../img/showcase.jpg";
import person from "../img/default.png";
import Spinner from "./Spinner";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export class Posts extends Component {
  static propTypes = {
    fetchPost: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
  };

  state = {
    image: null,
  };

  openModal = () => {
    document.getElementById("imgModal").style.display = "block";
  };

  closeModal = () => {
    document.getElementById("imgModal").style.display = "none";
  };

  clickOutside = (e) => {
    if (e.target === document.querySelector("#imgModal")) {
      document.getElementById("imgModal").style.display = "none";
    } else if (e.target === document.querySelector(".imageModal")) {
      document.getElementById("imgModal").style.display = "none";
    }
  };

  imgModal = (img) => {
    this.openModal();
    this.setState({
      image: img,
    });
  };

  reloadPost = () => {
    this.props.fetchPost();
  };

  componentDidMount() {
    this.props.fetchPost();
  }

  render() {
    const { posts } = this.props;

    window.addEventListener("click", this.clickOutside);

    return (
      <>
        <div className="modal" id="imgModal">
          <div className="imageModal">
            <div>
              <img src={this.state.image} />
            </div>
            <i onClick={this.closeModal} className="fa fa-close"></i>
          </div>
        </div>
        <div className="posts">
          {posts === undefined ||
          posts === null ||
          posts === "" ||
          posts.length === 0 ? (
            <Spinner />
          ) : (
            <>
              {posts.map((post) => (
                <div key={post.id} className="card">
                  {!post.author ? (
                    <>
                      <Spinner />
                      {this.reloadPost()}
                    </>
                  ) : (
                    <>
                      <div className="title">
                        <div className="author-dp">
                          <Link to={`/developers/${post.profile}`}>
                            {post.dp ? (
                              <img src={post.dp} alt={`${post.author}'Dp`} />
                            ) : (
                              <>
                                <img src={person} alt={`${post.author}'Dp`} />
                              </>
                            )}
                          </Link>
                        </div>
                        <div className="author-info">
                          <div>
                            <Link to={`/developers/${post.profile}`}>
                              <h4 className="author-username">{post.author}</h4>
                            </Link>
                            {post.profession ? (
                              <p className="author-proffesion">
                                {post.profession}
                              </p>
                            ) : (
                              ""
                            )}

                            <small className="date-posted">
                              <Moment startOf="day" fromNow>
                                {post.date_updated}
                              </Moment>{" "}
                              <i className="fa fa-globe"></i>
                            </small>
                          </div>
                          <div className="post-menu">
                            <i className="fa fa-ellipsis-h"></i>
                          </div>
                        </div>
                      </div>
                      <p className="post-body">{post.body}</p>
                      {post.image ? (
                        <div className="post-image">
                          <img
                            src={post.image}
                            onClick={() => {
                              this.imgModal(post.image);
                              // alt = `${post.author}'s Image Post`
                            }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { fetchPost })(Posts);
