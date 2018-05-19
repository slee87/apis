var mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/todo-api");

mongoose.Promise = Promise;

// models

module.exports.Todo = require("./todo");