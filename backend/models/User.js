import mongoose from "mongoose";

// Adapted from CS309_Student_Registration_Lab/backend/models/Student.js
// Week 1: No password hashing or authentication yet (deferred to Week 3).
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "University email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },
    department: {
      type: String,
      required: [true, "Department or faculty is required"],
      trim: true
    },
    role: {
      type: String,
      enum: ["buyer", "seller", "moderator"],
      default: "buyer"
    },
    phone: {
      type: String,
      default: "",
      trim: true
    },
    meetupSpot: {
      type: String,
      default: "Main Campus Library",
      trim: true
    },
    bio: {
      type: String,
      default: "",
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;
