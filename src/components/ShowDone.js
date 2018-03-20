import React from "react";
import {withRouter} from 'react-router-dom';

class ShowDone extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.filterTask = this.filterTask.bind(this);
    }

    handleChange(e) {
        const showDoneChecked = e.target.checked;
        let prevSearchQuery = this.props.location.search;
        const regExpTaskSearch = /task=([^&]*)/;

        if (prevSearchQuery) {
            const taskSearchIsPresent = regExpTaskSearch.test(prevSearchQuery);
            if (taskSearchIsPresent) {
                const taskSearchValue = prevSearchQuery.match(regExpTaskSearch)[1];
                this.props.history.push(`?showdone=${showDoneChecked}&task=${taskSearchValue}`);
            } else {
                this.props.history.push(`?showdone=${showDoneChecked}`);
            }
        } else {
            this.props.history.push(`?showdone=${showDoneChecked}`);
        }
    }

    filterTask() {
        const filtersString = this.props.location.search;
        let showDoneFilter;
        const regExp = /showdone=([^&]*)/;
        if (filtersString.length && regExp.test(filtersString)) {
            showDoneFilter = filtersString.match(/showdone=([^&]*)/)[1] !== 'false';
        }
        return showDoneFilter || false;
    }

    render() {
        return (
            <div className="option">
                <input
                    type="checkbox"
                    className="option__input"
                    id="show-done"
                    checked={this.filterTask()}
                    onChange={this.handleChange}
                />
                <label className="option__label" htmlFor="show-done">Show done</label>
            </div>
        )
    }
}

export default withRouter(ShowDone);
