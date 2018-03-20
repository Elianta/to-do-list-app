export default class TaskNode {
    constructor(name, description, isDone) {
        this.name = name;
        this.description = description || "";
        this.isDone = isDone || false;
    }
}
