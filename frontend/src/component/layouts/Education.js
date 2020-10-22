import React, { Component } from "react";
import { connect } from "react-redux";
import { myEduct, addEduct } from "../../actions/education";
import PropTypes from "prop-types";

export class Education extends Component {
  state = {
    school: "",
    degree: "",
    study_field: "",
    start: "",
    end: "",
    description: "",
  };

  componentDidMount() {
    this.props.myEduct();
  }

  static propTypes = {
    edu: PropTypes.array.isRequired,
    addEduct: PropTypes.func.isRequired,
  };

  resetState = () => {
    this.setState({
      school: "",
      degree: "",
      study_field: "",
      start: "",
      end: "",
      description: "",
    });
  };

  openModal = () => {
    this.resetState();
    document.getElementById("eduModal").style.display = "block";
  };

  closeModal = () => {
    document.getElementById("eduModal").style.display = "none";
  };

  clickOutside = (e) => {
    if (e.target === document.getElementById("eduModal")) {
      document.getElementById("eduModal").style.display = "none";
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    // Submits to server
    this.props.addEduct(this.state);

    this.resetState();
    this.closeModal();

    // Refresh the page
    this.props.myEduct();
  };

  render() {
    const { edu } = this.props;

    const { school, degree, study_field, start, end, description } = this.state;

    window.addEventListener("click", this.clickOutside);

    return (
      <section className="education">
        <div className="modal" id="eduModal">
          <div className="modal-content">
            <form type="post" onSubmit={this.onSubmit}>
              <div className="modal-title">
                <h2>Add education</h2>
                <h1>
                  <i className="fa fa-close" onClick={this.closeModal}></i>
                </h1>
              </div>
              <div className="modal-body">
                <div className="educationModal">
                  <div className="form-group">
                    <label htmlFor="school">
                      School<span>*</span>
                    </label>
                    <input
                      type="text"
                      name="school"
                      value={school}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="degree">Degree</label>
                    <input
                      type="text"
                      name="degree"
                      value={degree}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="field_of_study">Field of study</label>
                    <input
                      type="text"
                      name="study_field"
                      value={study_field}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="years">
                    <div className="startYear">
                      <label htmlFor="start">
                        Start Year <span>*</span>
                      </label>
                      <div className="dateInput">
                        <select
                          name="start"
                          value={start}
                          onChange={this.onChange}
                        >
                          {" "}
                          <option value="">Year</option>
                          <option value="2020">2020</option>
                          <option value="2019">2019</option>
                          <option value="2018">2018</option>
                          <option value="2017">2017</option>
                          <option value="2016">2016</option>
                          <option value="2015">2015</option>
                          <option value="2014">2014</option>
                          <option value="2013">2013</option>
                          <option value="2012">2012</option>
                          <option value="2011">2011</option>
                          <option value="2010">2010</option>
                          <option value="2009">2009</option>
                          <option value="2008">2008</option>
                          <option value="2007">2007</option>
                          <option value="2006">2006</option>
                          <option value="2005">2005</option>
                          <option value="2004">2004</option>
                          <option value="2003">2003</option>
                          <option value="2002">2002</option>
                          <option value="2001">2001</option>
                          <option value="2000">2000</option>
                          <option value="1999">1999</option>
                          <option value="1998">1998</option>
                          <option value="1997">1997</option>
                          <option value="1996">1996</option>
                          <option value="1995">1995</option>
                          <option value="1994">1994</option>
                          <option value="1993">1993</option>
                          <option value="1992">1992</option>
                          <option value="1991">1991</option>
                          <option value="1990">1990</option>
                          <option value="1989">1989</option>
                          <option value="1988">1988</option>
                          <option value="1987">1987</option>
                          <option value="1986">1986</option>
                          <option value="1985">1985</option>
                          <option value="1984">1984</option>
                          <option value="1983">1983</option>
                          <option value="1982">1982</option>
                          <option value="1981">1981</option>
                          <option value="1980">1980</option>
                          <option value="1979">1979</option>
                          <option value="1978">1978</option>
                          <option value="1977">1977</option>
                          <option value="1976">1976</option>
                          <option value="1975">1975</option>
                          <option value="1974">1974</option>
                          <option value="1973">1973</option>
                          <option value="1972">1972</option>
                          <option value="1971">1971</option>
                          <option value="1970">1970</option>
                          <option value="1969">1969</option>
                          <option value="1968">1968</option>
                          <option value="1967">1967</option>
                          <option value="1966">1966</option>
                          <option value="1965">1965</option>
                          <option value="1964">1964</option>
                          <option value="1963">1963</option>
                          <option value="1962">1962</option>
                          <option value="1961">1961</option>
                        </select>
                      </div>
                    </div>
                    <div className="endYear">
                      <label htmlFor="end">End Year (or expected)</label>
                      <div className="dateInput">
                        <select name="end" value={end} onChange={this.onChange}>
                          {" "}
                          <option value="">Year</option>
                          <option value="2020">2020</option>
                          <option value="2019">2019</option>
                          <option value="2018">2018</option>
                          <option value="2017">2017</option>
                          <option value="2016">2016</option>
                          <option value="2015">2015</option>
                          <option value="2014">2014</option>
                          <option value="2013">2013</option>
                          <option value="2012">2012</option>
                          <option value="2011">2011</option>
                          <option value="2010">2010</option>
                          <option value="2009">2009</option>
                          <option value="2008">2008</option>
                          <option value="2007">2007</option>
                          <option value="2006">2006</option>
                          <option value="2005">2005</option>
                          <option value="2004">2004</option>
                          <option value="2003">2003</option>
                          <option value="2002">2002</option>
                          <option value="2001">2001</option>
                          <option value="2000">2000</option>
                          <option value="1999">1999</option>
                          <option value="1998">1998</option>
                          <option value="1997">1997</option>
                          <option value="1996">1996</option>
                          <option value="1995">1995</option>
                          <option value="1994">1994</option>
                          <option value="1993">1993</option>
                          <option value="1992">1992</option>
                          <option value="1991">1991</option>
                          <option value="1990">1990</option>
                          <option value="1989">1989</option>
                          <option value="1988">1988</option>
                          <option value="1987">1987</option>
                          <option value="1986">1986</option>
                          <option value="1985">1985</option>
                          <option value="1984">1984</option>
                          <option value="1983">1983</option>
                          <option value="1982">1982</option>
                          <option value="1981">1981</option>
                          <option value="1980">1980</option>
                          <option value="1979">1979</option>
                          <option value="1978">1978</option>
                          <option value="1977">1977</option>
                          <option value="1976">1976</option>
                          <option value="1975">1975</option>
                          <option value="1974">1974</option>
                          <option value="1973">1973</option>
                          <option value="1972">1972</option>
                          <option value="1971">1971</option>
                          <option value="1970">1970</option>
                          <option value="1969">1969</option>
                          <option value="1968">1968</option>
                          <option value="1967">1967</option>
                          <option value="1966">1966</option>
                          <option value="1965">1965</option>
                          <option value="1964">1964</option>
                          <option value="1963">1963</option>
                          <option value="1962">1962</option>
                          <option value="1961">1961</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      name="description"
                      value={description}
                      onChange={this.onChange}
                    />
                  </div>
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
        <div className="title">
          <h4>Education</h4>
          <div onClick={this.openModal}>
            Add education{" "}
            <i className="fa fa-plus-square" onClick={this.openModal}></i>
          </div>
        </div>
        {edu
          ? edu.map((item) => (
              <div className="body" key={item.id}>
                <div className="icon">
                  <i className="fa fa-graduation-cap"></i>
                </div>
                <div className="content">
                  <div className="content-title">
                    <h4>{item.school}</h4>
                    <i
                      className="fa fa-pencil"
                      onClick={() => {
                        this.updateEdu(item);
                      }}
                    ></i>
                  </div>
                  <div className="content-body">
                    <p className="job-title">
                      {item.degree}, {item.study_field}
                    </p>
                    <p>
                      {item.start} - {item.end}
                    </p>
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
  edu: state.education.myEdu,
});

export default connect(mapStateToProps, { myEduct, addEduct })(Education);
