class TodoItem {
  private readonly _createTimestamp: number;
  private readonly _identifier: string;

  constructor(private _description: string, identifier?: string) {
    this._createTimestamp = new Date().getTime();

    if (identifier) {
      this._identifier = identifier;
    } else {
      // this is just for example other use UUID
      this._identifier = Math.random()
        .toString(36)
        .substring(2, 9);
    }
  }

  get creationTimestamp(): number {
    return this._createTimestamp;
  }

  get idenitifer(): string {
    return this._identifier;
  }

  get description(): string {
    return this._description;
  }
}

class TodoList {
  private _todoList: ReadonlyArray<TodoItem> = [];

  constructor(todoList?: TodoItem[]) {
    // first we make sure that we have received a valid array

    if (Array.isArray(todoList) && todoList.length) {
      this._todoList = this._todoList.concat(todoList);
    }
  }

  get todoList(): ReadonlyArray<TodoItem> {
    return this._todoList;
  }

  addTodo(todoItem: TodoItem) {
    if (todoItem) {
      // the value is "truthy"
      // no null or undefined or NaN or empty string or 0 or false
      this._todoList = [...this._todoList, todoItem];
    }
  }

  removeTodo(itemId: string) {
    if (itemId) {
      this._todoList = this._todoList.filter(item => {
        if (item.idenitifer === itemId) {
          return false;
        } else {
          return true;
        }
      });
    }
  }
}

interface TodoListView {
  render(TodoList: ReadonlyArray<TodoItem>): void;
  getInput(): TodoItem;
  getFilter(): string;
  clearInput(): void;
  filter(): void;
}

class HTMLTodoListView implements TodoListView {
  private readonly todoInput: HTMLInputElement;
  private readonly todoListDiv: HTMLDivElement;
  private readonly todoListFilter: HTMLInputElement;

  constructor() {
    this.todoInput = document.getElementById('todoInput') as HTMLInputElement;
    this.todoListDiv = document.getElementById(
      'todoListContainer'
    ) as HTMLDivElement;
    this.todoListFilter = document.getElementById(
      'todoFilter'
    ) as HTMLInputElement;

    // defensive checks
    if (!this.todoInput) {
      throw new Error(
        'Could not find the todoinput html input element. Is the HTML correct'
      );
    }

    if (!this.todoListDiv) {
      throw new Error(
        'Could not find the todoListContainer HTML div.  Is the HTML Correct?'
      );
    }

    if (!this.todoListFilter) {
      throw new Error(
        'Could not find the todoFilter HTML Input.  Is the HTML Correct?'
      );
    }
  }

  clearInput(): void {
    this.todoInput.value = '';
  }

  getFilter(): string {
    return this.todoListFilter.value.toUpperCase();
  }

  getInput(): TodoItem {
    const todoInputValue: string = this.todoInput.value.trim();

    const retVal: TodoItem = new TodoItem(todoInputValue);
    return retVal;
  }

  render(todoList: ReadonlyArray<TodoItem>): void {
    console.log('Updating the rendered todo list');
    this.todoListDiv.innerHTML = '';
    this.todoListDiv.textContent = '';

    const ul = document.createElement('ul');
    ul.setAttribute('id', 'todoList');
    this.todoListDiv.append(ul);

    todoList.forEach(item => {
      const li = document.createElement('li');
      li.setAttribute('class', 'todo-list-item');
      li.innerHTML = `<a href="#" onclick="todoIt.removeTodo('${item.idenitifer}')" >${item.description}</a>`;
      ul.appendChild(li);
    });
  }

  filter(): void {
    console.log('Filtering the rendered todo list');
    const todoListHtml: HTMLUListElement = document.getElementById(
      'todolist'
    ) as HTMLUListElement;

    if (todoListHtml === null) {
      console.log('Nothing to filter');
      return;
    }

    const todoListFilterText = this.getFilter();
    todoListHtml.childNodes.forEach(item => {
      let itemText: string | null = item.textContent;
      if (itemText !== null) {
        itemText = itemText.toUpperCase();
        if (itemText.startsWith(todoListFilterText)) {
        }
      }
    });
  }
}
