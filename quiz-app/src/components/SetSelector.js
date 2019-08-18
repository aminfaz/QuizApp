import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import ReactLoading from "react-loading";
import QuizAPI from "../api/QuizAPI";
import QuizSet from "./QuizSet";
import ErrorViewer from "./ErrorViewer";

class SetSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionToken: props.sessionToken,
      sets: [],
      selectedOption: null,
      error: null
    };
  }

  async componentDidMount() {
    try {
      let sets = await QuizAPI.getSets();
      sets = sets.map(set => {
        return {
          value: set.id,
          label: set.description,
          passMark: parseInt(set.passMark)
        };
      });
      this.setState({
        sets
      });
    } catch (ex) {
      let error = {
        message: "Could not load set",
        inner: ex
      };
      this.setState({
        error
      });
    }
  }

  handleChange = selectedOption => {
    this.setState({
      selectedOption
    });
  };

  render() {
    const { selectedOption, error } = this.state;

    if (error) {
      return <ErrorViewer error={error} />;
    } else if (this.state.sets.length === 0) {
      return (
        <div className="loadingContainer">
          <ReactLoading
            type={"spin"}
            color={"#53D2F9"}
            height={"100px"}
            width={"100px"}
            className="loading"
          />
          Loading Question Sets....
        </div>
      );
    } else if (selectedOption) {
      return (
        <QuizSet sessionToken={this.state.sessionToken} set={selectedOption} />
      );
    } else {
      return (
        <div className="container">
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={this.state.sets}
          />
        </div>
      );
    }
  }
}

SetSelector.propTypes = {
  sessionToken: PropTypes.string.isRequired
};

export default SetSelector;
