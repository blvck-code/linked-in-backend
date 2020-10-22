import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProfile, myProfile } from "../../actions/profiles";

export class EditProfile extends Component {
  state = {
    bg_pic: null,
    profile_pic: null,
    profession: "",
    headline: "",
    country: "",
    location: "",
  };

  componentDidMount() {
    this.setState(this.props.profile);
  }

  closeModal = (id) => {
    document.getElementById(id).style.display = "none";
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  handleBgChange = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      this.setState({
        bg_pic: e.target.result,
      });
    };
  };

  handleProfileChange = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      this.setState({
        profile_pic: e.target.result,
      });
    };
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { profile } = this.props;
    this.props.updateProfile(profile.id, this.state);
    this.closeModal("profileModal");
  };

  render() {
    const {
      bg_pic,
      profile_pic,
      profession,
      headline,
      country,
      location,
    } = this.state;
    const { profile } = this.props;

    return (
      <div className="modal" id="profileModal">
        <div className="modal-content">
          <div className="modal-title">
            <h2>Edit intro</h2>
            <h1 onClick={() => this.closeModal("profileModal")}>
              <i className="fa fa-close"></i>
            </h1>
          </div>
          <div className="modal-body">
            <form type="post" onSubmit={this.onSubmit}>
              <div className="profileModal">
                <div className="bg_img">
                  <input
                    type="file"
                    name="bg_img"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={this.handleBgChange}
                    ref={(bgInput) => (this.bgInput = bgInput)}
                  />
                  <img src={bg_pic} />
                  <i
                    className="fa fa-camera"
                    onClick={() => this.bgInput.click()}
                  ></i>
                </div>
                <div className="profile_img">
                  <img src={profile_pic} />
                  <input
                    type="file"
                    name="profile_img"
                    onChange={this.handleProfileChange}
                    style={{ display: "none" }}
                    ref={(profileInput) => (this.profileInput = profileInput)}
                  />
                  <i
                    className="fa fa-pencil"
                    onClick={() => this.profileInput.click()}
                  ></i>
                </div>
                <div className="form-group">
                  <label htmlFor="profession">
                    Profession<span>*</span>
                  </label>
                  <select
                    name="profession"
                    value={profession}
                    onChange={this.onChange}
                  >
                    <option value=" ">* Select Proffessional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">
                      Student or Learning
                    </option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="headline">Headline</label>
                  <textarea
                    name="headline"
                    value={headline}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">
                    Country/Region<span>*</span>
                  </label>
                  <input
                    name="country"
                    value={country}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">
                    Location in this Country/Region
                  </label>
                  <input
                    name="location"
                    value={location}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-modal">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profiles.myProfile,
});
export default connect(mapStateToProps, { updateProfile, myProfile })(
  EditProfile
);
