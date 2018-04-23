const getVisibleTasks = (tasks, {showDone, text}) => {
    return tasks.filter((task) => {
        const textMatch = task.name.toLowerCase().includes(text.toLowerCase());
        const showDoneMatch = (showDone === false) ? task.isDone === false : true;
        return textMatch && showDoneMatch;
    });
};
export default getVisibleTasks;
