const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is missing"],
  },
  email: {
    type: String,
    required: [true, "Email is missing"],
  },
  suggestion: {
    type: String,
    required: [true, "Suggestion is missing"],
  },
});
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;