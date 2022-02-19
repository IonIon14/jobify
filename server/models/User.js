import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: String,
    maxlength: 20,
    trim: true,
    default: "lastname",
  },
  location: {
    type: String,
    trim: true,
    default: "My City",
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  //next();
});

UserSchema.methods.createJWT = function () {
  //console.log(this);
  return jwt.sign({ userId: this._id }, process.env.ACCESS_TOKEN, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model("User", UserSchema);
