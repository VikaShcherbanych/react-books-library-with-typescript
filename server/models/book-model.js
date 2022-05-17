const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  title: { type: String, required: true },
  authors: [{ type: String }],
  categories: [{ type: String }],
  imageLink: { type: String },
  previewLink: { type: String },
  id: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Book", BookSchema);
