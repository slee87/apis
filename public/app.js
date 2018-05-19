// get data from API endpoint

$(document).ready(() => {
    // add all todos
    $.getJSON("/api/todos")
    .then((data) => {
        addTodos(data);
    })
    .catch((err) => {
        console.log(err);
    });
    
    // add data via form
    $("#todoInput").keypress((event) => {
        if (event.which == 13) {
            createTodo();
        }
    });
    
    // delete
    $(".list").on("click", "span", (e) => {
        e.stopPropagation();
        deleteTodo($(e.target).parent());
    })
    
    // toggle completion status
    $(".list").on("click", "li", (e) => {
        updateTodo($(e.target));
    })
    
});

// add all todos
function addTodos(todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

// add single todo to page
function addTodo(todo) {
    // create todo item li
    var newTodo = $("<li>" + todo.name + "<span>X</span></li>");
    newTodo.data("id", todo._id);
    newTodo.data("completed", todo.completed);
    
    // styling
    newTodo.addClass("task");
    if (todo.completed) { newTodo.addClass("done") };
    
    // append the todos
    $(".list").append(newTodo);
}

// form to add data
function createTodo() {
    // send requst to create new todo
    var userInput = $("#todoInput").val();
    $.post("/api/todos", { name: userInput })
    .then((newTodo) => {
        addTodo(newTodo);
        $("#todoInput").val("");
    })
    .catch((err) => {
        console.log(err);
    });
}

// delete request
function deleteTodo(todo) {
    // get id
    var clickedId = todo.data("id");
    var deleteURL = "/api/todos/" + clickedId;
    
    // send delete request
    $.ajax({
        method: "DELETE",
        url: deleteURL
    })
    .then((data) => {
        todo.remove();
    })
    
}

// update todo
function updateTodo(todo) {
    var updateURL = "/api/todos/" + todo.data("id");
    var isDone = !todo.data("completed");
    var updateData = { completed: isDone };
    
    $.ajax({
        method: "PUT",
        url: updateURL,
        data: updateData
    })
    .then((updatedTodo) => {
        todo.toggleClass("done");
        todo.data("completed", isDone);
    })
}