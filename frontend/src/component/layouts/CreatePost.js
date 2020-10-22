import React, { Component } from "react";
import img from "../img/showcase.jpg";
import { connect } from "react-redux";
import { createPost, fetchPost } from "../../actions/posts";

class CreatePost extends Component {
  state = {
    body: "",
    image: null,
  };

  resetState = () => {
    this.setState({
      body: "",
      image: null,
    });
  };
  openModal = () => {
    document.getElementById("createModal").style.display = "block";
  };

  closeModal = () => {
    this.resetState();
    document.getElementById("createModal").style.display = "none";
    document.querySelector(".image-group").style.display = "none";
  };

  clickOutside = (e) => {
    if (e.target === document.getElementById("createModal")) {
      document.getElementById("createModal").style.display = "none";
      document.querySelector(".image-group").style.display = "none";
      this.resetState();
    }
  };

  onChange = (e) => this.setState({ body: e.target.value });

  readURL = (e) => {
    // this.setState({
    //   image: e.target.files[0],
    // });
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      this.setState({
        image: e.target.result,
      });
      document.querySelector(".image-group").style.display = "block";
    };

    // let formData = new FormData();
    // formData.append("image", this.state.file, this.state.file.name);
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.createPost(this.state);
    this.props.fetchPost();
    this.closeModal();
  };

  render() {
    window.addEventListener("click", this.clickOutside);

    const { body, image } = this.state;

    return (
      <>
        <form className="card">
          <div className="create-post">
            <i className="fa fa-edit"></i>
            <input
              type="text"
              name="body"
              autoComplete="false"
              onFocus={this.openModal}
              placeholder="Start a post"
            />
          </div>
          <div className="postIcon">
            <p>
              <i className="fa fa-camera"></i> Photo
            </p>
            <p>
              <i className="fa fa-video-camera"></i> Video
            </p>
            <p>
              <i className="fa fa-file"></i> Document
            </p>
          </div>
        </form>
        <div id="createModal" className="modal">
          <div className="modal-content">
            <form
              method="post"
              encType="multipart/file-data"
              onSubmit={this.onSubmit}
              type="post"
            >
              <div className="modal-title">
                <h2>Create a post</h2>
                <h1>
                  <i className="fa fa-close" onClick={this.closeModal}></i>
                </h1>
              </div>
              <div className="modal-body">
                <div className="createModal">
                  <div className="form-group">
                    <textarea
                      placeholder="What do you want to talk about?"
                      value={body}
                      autoComplete="false"
                      onChange={this.onChange}
                    />
                  </div>

                  <div
                    className="form-group image-group"
                    onClick={() => this.postInput.click()}
                  >
                    <img
                      className="img-fluid image image-file"
                      src={image}
                      alt="Post"
                    />
                    <div className="middle">
                      <i
                        className="fa fa-camera"
                        onClick={() => this.postInput.click()}
                      ></i>
                    </div>
                  </div>

                  <div className="form-group">
                    <input
                      type="file"
                      name="image"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={this.readURL}
                      ref={(postInput) => (this.postInput = postInput)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <i
                  className="fa fa-camera"
                  onClick={() => this.postInput.click()}
                ></i>
                <button type="submit">Post</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
export default connect(null, { createPost, fetchPost })(CreatePost);
