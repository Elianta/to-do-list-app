import React from 'react';
import {connect} from 'react-redux';
import {setShowDoneFilter} from '../actions/filters';
import {bindActionCreators} from 'redux';

export class ShowDone extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const showDone = e.target.checked;
        this.props.setShowDoneFilter(showDone);
        this.changeBrowserHistory(showDone);
    }

    changeBrowserHistory(showDone) {
        if (this.props.filters.text) {
            this.props.history.replace({
                pathname: this.props.location.pathname,
                search: `?showdone=${showDone}&text=${this.props.filters.text}`,
            });
        } else {
            this.props.history.replace({
                pathname: this.props.location.pathname,
                search: `?showdone=${showDone}`,
            });
        }
    }

    render() {
        return (
            <div className="option">
                <input
                    data-testid="show-done"
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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setShowDoneFilter
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowDone);
