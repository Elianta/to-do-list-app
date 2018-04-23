import React from 'react';
import {connect} from 'react-redux';
import {setShowDoneFilter} from '../actions/filters';

class ShowDone extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const showDoneChecked = e.target.checked;
        this.props.dispatch(setShowDoneFilter(showDoneChecked));
        if (this.props.filters.text) {
            this.props.history.replace({
                pathname: this.props.location.pathname,
                search: `?showdone=${showDoneChecked}&text=${this.props.filters.text}`,
            });
        } else {
            this.props.history.replace({
                pathname: this.props.location.pathname,
                search: `?showdone=${showDoneChecked}`,
            });
        }
    }

    render() {
        return (
            <div className="option">
                <input
                    type="checkbox"
                    className="option__input"
                    id="show-done"
                    checked={this.props.filters.showDone}
                    onChange={this.handleChange}
                />
                <label className="option__label" htmlFor="show-done">Show done</label>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

export default connect(mapStateToProps)(ShowDone);
