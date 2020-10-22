import React, { Component } from "react";
import { connect } from "react-redux";
import { myExpe, updateExpe } from "../../actions/experience";
import PropTypes from "prop-types";
import CreateExpe from "./CreateExpe";
import UpdateExpe from "./UpdateExpe";

export class Experience extends Component {
  static propTypes = {
    expe: PropTypes.array.isRequired,
    myExpe: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.myExpe();
  }

  openModal = (id) => {
    document.getElementById(id).style.display = "block";
  };

  updateExp = (id) => {
    document.getElementById("updateModal").style.display = "block";
    this.setState({
      id: id,
    });
  };

  render() {
    return (
      <section className="experience">
        <div className="modal" id="expeModal">
          <CreateExpe />
        </div>
        <div className="modal" id="updateModal">
          <UpdateExpe state={this.state} />
        </div>
        <div className="title">
          <h4>Experience</h4>
          <i
            className="fa fa-plus"
            onClick={() => {
              this.openModal("expeModal");
            }}
          ></i>
        </div>
        {this.props.expe
          ? this.props.expe.map((item) => (
              <div className="body" key={item.id}>
                <div className="icon">
                  <i className="fa fa-folder-open-o"></i>
                </div>
                <div className="content">
                  <div className="content-title">
                    <h4>{item.job}</h4>
                    <i
                      className="fa fa-pencil"
                      onClick={() => this.updateExp(item.id)}
                    ></i>
                  </div>
                  <div className="content-body">
                    <p className="job-title">
                      {item.job} at {item.company}
                    </p>
                    <p>
                      {item.start} - {item.end}
                    </p>
                    <p>{item.location}</p>
                    <p className="job-summary">{item.description}</p>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expe: state.experience.myExpe,
  update: state.experience.update,
});

export default connect(mapStateToProps, { myExpe, updateExpe })(Experience);
