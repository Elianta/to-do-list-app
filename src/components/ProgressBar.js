import React from 'react';
import {connect} from 'react-redux';

const ProgressBar = ({categories, selectedCategory}) => {

    function calculateProgressPercent(categories, categoryID) {
        return categories.reduce(function (prev, category) {
            if (category.id === categoryID) {
                const tasksNumber = category.tasks.length;
                const standardPercent = 100;
                const tasksDone = category.tasks.reduce((prev, task) => {
                    if (task.isDone) {
                        return prev + 1;
                    }
                    return prev;
                }, 0);
                const progressPercent = tasksDone / tasksNumber * 100;
                if (tasksNumber) {
                    return prev.concat(progressPercent);
                } else {
                    return prev.concat(standardPercent);
                }

            } else if (category.children.length && !prev.length) {
                return calculateProgressPercent(category.children, categoryID);
            }
            return prev;
        }, '');
    }

    const progressPercent = calculateProgressPercent(categories, +selectedCategory);

    return (
        <div className="progress-bar">
            <div className="progress-bar__line" style={{width: `${progressPercent}%`}}>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    categories: state.categories,
});

export default connect(mapStateToProps)(ProgressBar);
