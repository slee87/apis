var express = require("express"),
    router = express.Router(),
    db = require("../models"),
    helpers = require("../helpers/todos");

///// routes

router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodo);

// individual todos
router.route("/:todoId")
    .get(helpers.getTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo);
    
// export

module.exports = router;