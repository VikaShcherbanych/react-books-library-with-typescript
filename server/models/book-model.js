const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  title: { type: String },
  authors: [{ type: String }],
  categories: [{ type: String }],
  imageLink: { type: String },
  previewLink: { type: String },
  id: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "user" },
});

module.exports = model("Book", BookSchema);
