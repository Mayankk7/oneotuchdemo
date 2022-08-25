const mongoose = require("mongoose");
const { Schema } = mongoose;
const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    lastViewed: {
      type: Date,
      default: Date.now()
    },
    totalclicks: {
      type: Number,
      default:0
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Admin", adminSchema);
