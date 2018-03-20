import React from "react";

export default class SearchToDoItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            search: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const prevSearchQuery = this.props.location.search;
        const regExpShowDone = /[?]showdone=([^&]*)/;
        if (prevSearchQuery) {
            const optionIsPresent = regExpShowDone.test(prevSearchQuery);
            if (optionIsPresent) {
                const showDoneValue = prevSearchQuery.match(regExpShowDone)[1];
                this.props.history.push(`?showdone=${showDoneValue}&task=${this.state.search}`);
            } else {
                this.props.history.push(`?task=${this.state.search}`);
            }

        } else {
            this.props.history.push(`?task=${this.state.search}`);
        }

        this.setState(() => ({
            search: ''
        }))
    }

    handleChange(event) {
        let value = event.target.value;
        this.setState(() => ({
            search: value
        }))
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
        )
    }
}
