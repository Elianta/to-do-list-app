import React from "react";

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.categoryID = parseInt(this.props.location.pathname.split('/')[2], 10);
  }

  componentDidMount() {
      this.props.updateProgressBar(this.categoryID);
  }

  render() {
    return (
      <div className="progress-bar">
        <div className="progress-bar__line" style={{width: `${this.props.taskDonePercent}%`}}>
        </div>
      </div>
    )
  }
}
