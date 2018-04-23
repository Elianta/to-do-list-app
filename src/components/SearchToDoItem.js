import React from 'react';
import {connect} from 'react-redux';
import {setTextFilter} from '../actions/filters';

class SearchToDoItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            search: ''
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.history.replace({
            pathname: this.props.location.pathname,
            search: `?showdone=${this.props.filters.showDone}&text=${this.state.search}`,
        });

        this.props.dispatch(setTextFilter(this.state.search));
    }

    handleChange(event) {
        let value = event.target.value;
        this.setState(() => ({
            search: value
        }));
    }

    render() {
        return (
            <form className="search-bar" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="search"
                    className="search-bar__input"
                    placeholder="Search..."
                    value={this.state.search}
                    onChange={this.handleChange}
                />
                <div className="search-bar__btn-container">
                    <button className="search-bar__btn-search" type="submit">Search</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

export default connect(mapStateToProps)(SearchToDoItem);
