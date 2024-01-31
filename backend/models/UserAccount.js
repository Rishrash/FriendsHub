import mongoose from "mongoose";
import UserAccountInformation from "./UserAccountInformation";

const { ObjectId } = mongoose.Schema;

// Define the userAccountSchema
const userAccountSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    text: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    text: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    text: true,
  },
  emailAddress: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
    trim: true,
    text: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  userInformation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAccountInformation",
  },
});

// Create a UserAccount model using the schema
const UserAccount = mongoose.model("UserAccount", userAccountSchema);

// Export the model for use in other parts of the application
module.exports = UserAccount;
