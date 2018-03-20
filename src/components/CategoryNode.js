export default class CategoryNode {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.children = [];
    this.tasks = [];
  }
}