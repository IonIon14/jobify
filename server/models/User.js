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
  // const salt = await bcrypt.genSalt(10);
  // this.password = await bcrypt.hash(this.password, salt); this.password doesn't exist because the paSsword has select:false in User model
  //next();
  //console.log(this.modifiedPaths());
  //console.log(this.isModified("name"));
  if (!this.isModified("password")) return;
  const salt = await bcrypt.getSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  //console.log(this);
  return jwt.sign({ userId: this._id }, process.env.ACCESS_TOKEN, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
