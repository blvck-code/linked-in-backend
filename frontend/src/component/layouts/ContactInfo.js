import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "./Spinner";

import EditContactModal from "./EditContactModal";

export class ContactInfo extends Component {
  openModal = (id) => {
    document.getElementById(id).style.display = "block";
  };

  closeModal = (id) => {
    document.getElementById(id).style.display = "none";
  };

  clickOutside = (e) => {
    this.update = false;
    if (e.target === document.getElementById("contactModal")) {
      document.getElementById("contactModal").style.display = "none";
    }
  };

  render() {
    const { user, contact } = this.props;

    window.addEventListener("click", this.clickOutside);

    return (
      <>
        <div className="modal" id="editContactModal">
          <EditContactModal />
        </div>

        <div className="modal-content">
          <div className="modal-title">
            {user ? (
              <h2>
                {user.first_name} {user.last_name}
              </h2>
            ) : (
              ""
            )}
            <h1
              onClick={() => {
                this.closeModal("contactModal");
              }}
            >
              <i className="fa fa-close"></i>
            </h1>
          </div>
          <div className="modal-subtitle">
            <h2>Contact Info</h2>
            <div>
              <i
                className="fa fa-cogs"
                onClick={() => {
                  this.openModal("editContactModal");
                }}
              ></i>
            </div>
          </div>
          <div className="modal-body">
            <div className="contactModal">
              {!contact ? (
                <>
                  <Spinner />
                  {this.props.myContact()}
                </>
              ) : (
                <>
                  {contact.devsworld ? (
                    <>
                      <div className="devsworld">
                        <div className="icon">
                          <i className="fa fa-code"></i>
                        </div>
                        <div className="info">
                          <h3>Your Profile</h3>
                          <p>{contact.devsworld}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {contact.website_url ? (
                    <>
                      <div className="devsworld">
                        <div className="icon">
                          <i className="fa fa-globe"></i>
                        </div>
                        <div className="info">
                          <h3>Your website</h3>
                          <p>
                            {contact.website_url}{" "}
                            {contact.website_url_type ? (
                              <span>({contact.website_url_type})</span>
                            ) : (
                              ""
                            )}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {contact.github_username ? (
                    <>
                      <div className="github">
                        <div className="icon">
                          <i className="fa fa-github"></i>
                        </div>
                        <div className="info">
                          <h3>Github</h3>
                          <p>{contact.github_username}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {contact.twitter_username ? (
                    <>
                      <div className="twitter">
                        <div className="icon">
                          <i className="fa fa-twitter"></i>
                        </div>
                        <div className="info">
                          <h3>Twitter</h3>
                          <p>{contact.twitter_username}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {user ? (
                    <>
                      <div className="email">
                        <div className="icon">
                          <i className="fa fa-envelope"></i>
                        </div>
                        <div className="info">
                          <h3>Email</h3>
                          <p>{user.email}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {contact.phone ? (
                    <>
                      <div className="github">
                        <div className="icon">
                          <i className="fa fa-mobile-phone"></i>
                        </div>
                        <div className="info">
                          <h3>Phone</h3>
                          <p>
                            {contact.phone}
                            {contact.phone_type ? (
                              <span>({contact.phone_type})</span>
                            ) : (
                              ""
                            )}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {contact.birthday ? (
                    <>
                      <div className="dob">
                        <div className="icon">
                          <i className="fa fa-birthday-cake"></i>
                        </div>
                        <div className="info">
                          <h3>Birthday</h3>
                          <p>{contact.birthday}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {contact.address ? (
                    <>
                      <div className="address">
                        <div className="icon">
                          <i className="fa fa-address-book"></i>
                        </div>
                        <div className="info">
                          <h3>Address</h3>
                          <p>{contact.address}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  contact: state.contact.myContact,
});

export default connect(mapStateToProps, {})(ContactInfo);
