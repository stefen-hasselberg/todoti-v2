"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var TodoItem = /** @class */ (function () {
    function TodoItem(_description, identifier) {
        this._description = _description;
        this._createTimestamp = new Date().getTime();
        if (identifier) {
            this._identifier = identifier;
        }
        else {
            // this is just for example other use UUID
            this._identifier = Math.random()
                .toString(36)
                .substring(2, 9);
        }
    }
    Object.defineProperty(TodoItem.prototype, "creationTimestamp", {
        get: function () {
            return this._createTimestamp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TodoItem.prototype, "idenitifer", {
        get: function () {
            return this._identifier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TodoItem.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: true,
        configurable: true
    });
    return TodoItem;
}());
var TodoList = /** @class */ (function () {
    function TodoList(todoList) {
        // first we make sure that we have received a valid array
        this._todoList = [];
        if (Array.isArray(todoList) && todoList.length) {
            this._todoList = this._todoList.concat(todoList);
        }
    }
    Object.defineProperty(TodoList.prototype, "todoList", {
        get: function () {
            return this._todoList;
        },
        enumerable: true,
        configurable: true
    });
    TodoList.prototype.addTodo = function (todoItem) {
        if (todoItem) {
            // the value is "truthy"
            // no null or undefined or NaN or empty string or 0 or false
            this._todoList = __spreadArrays(this._todoList, [todoItem]);
        }
    };
    TodoList.prototype.removeTodo = function (itemId) {
        if (itemId) {
            this._todoList = this._todoList.filter(function (item) {
                if (item.idenitifer === itemId) {
                    return false;
                }
                else {
                    return true;
                }
            });
        }
    };
    return TodoList;
}());
var HTMLTodoListView = /** @class */ (function () {
    function HTMLTodoListView() {
        this.todoInput = document.getElementById("todoInput");
        this.todoListDiv = document.getElementById("todoListContainer");
        this.todoListFilter = document.getElementById("todoFilter");
        // defensive checks
        if (!this.todoInput) {
            throw new Error("Could not find the todoinput html input element. Is the HTML correct");
        }
        if (!this.todoListDiv) {
            throw new Error("Could not find the todoListContainer HTML div.  Is the HTML Correct?");
        }
        if (!this.todoListFilter) {
            throw new Error("Could not find the todoFilter HTML Input.  Is the HTML Correct?");
        }
    }
    HTMLTodoListView.prototype.clearInput = function () {
        this.todoInput.value = "";
    };
    HTMLTodoListView.prototype.getFilter = function () {
        return this.todoListFilter.value.toUpperCase();
    };
    HTMLTodoListView.prototype.getInput = function () {
        var todoInputValue = this.todoInput.value.trim();
        var retVal = new TodoItem(todoInputValue);
        return retVal;
    };
    HTMLTodoListView.prototype.render = function (todoList) {
        console.log("Updating the rendered todo list");
        this.todoListDiv.innerHTML = "";
        this.todoListDiv.textContent = "";
        var ul = document.createElement("ul");
        ul.setAttribute("id", "todoList");
        this.todoListDiv.append(ul);
        todoList.forEach(function (item) {
            var li = document.createElement("li");
            li.setAttribute("class", "todo-list-item");
            li.innerHTML = "<a href=\"#\" onclick=\"todoIt.removeTodo('" + item.idenitifer + "')\" >" + item.description + "</a>";
            ul.appendChild(li);
        });
    };
    HTMLTodoListView.prototype.filter = function () {
        console.log("Filtering the rendered todo list");
        var todoListHtml = document.getElementById("todoList");
        if (todoListHtml === null) {
            console.log("Nothing to filter, yeah");
            return;
        }
        var todoListFilterText = this.getFilter();
        todoListHtml.childNodes.forEach(function (item) {
            var itemText = item.textContent;
            if (itemText !== null) {
                itemText = itemText.toUpperCase();
                if (itemText.startsWith(todoListFilterText)) {
                    item.style.display = "list-item";
                }
                else {
                    item.style.display = "none";
                }
            }
        });
    };
    return HTMLTodoListView;
}());
var TodoIt = /** @class */ (function () {
    function TodoIt(_todoListView) {
        this._todoListView = _todoListView;
        this._todoList = new TodoList();
        console.log("TodoIt");
        if (!_todoListView) {
            throw new Error("The todo list view implmentation is required to properly initialize TodoIt");
        }
    }
    TodoIt.prototype.addTodo = function () {
        //TODO
        var newTodo = this._todoListView.getInput();
        // verify that there is something to add
        if ("" !== newTodo.description) {
            console.log("Adding Todo ", newTodo);
            // add the new item to the list
            this._todoList.addTodo(newTodo);
            console.log("New todo list ", this._todoList.todoList);
            // clear the input
            this._todoListView.clearInput();
            // update the rendered todo list
            this._todoListView.render(this._todoList.todoList);
            // filter the list
            this.filterTodoList();
        }
    };
    TodoIt.prototype.filterTodoList = function () {
        this._todoListView.filter();
    };
    TodoIt.prototype.removeTodo = function (idenitifer) {
        if (idenitifer) {
            console.log("item to remove ", idenitifer);
            this._todoList.removeTodo(idenitifer);
            this._todoListView.render(this._todoList.todoList);
            this.filterTodoList();
        }
    };
    return TodoIt;
}());
var EventUtils = /** @class */ (function () {
    function EventUtils() {
    }
    EventUtils.isEnter = function (event) {
        var isEnterResult = false;
        if (event !== undefined && event.defaultPrevented) {
            return false;
        }
        if (event == undefined) {
            isEnterResult = false;
        }
        else if (event.key !== undefined) {
            isEnterResult = event.key === "Enter";
        }
        else if (event.keyCode !== undefined) {
            isEnterResult = event.keyCode === 13;
        }
        return isEnterResult;
    };
    return EventUtils;
}());
var view = new HTMLTodoListView();
var todoIt = new TodoIt(view);
//# sourceMappingURL=todo-it.js.map