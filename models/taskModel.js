const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  taskName: {
    type: String,
    default: "",
  },
  taskDetail: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
  assignTo: {
    type: String,
    default: "",
  },
  priority: {
    type: String,
    default: "",
  },
  creationDate: {
    type: Date
  }
});

const Token = mongoose.model("Task", taskSchema);
module.exports = Token;
