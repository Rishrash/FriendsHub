import mongoose from "mongoose";

// const { ObjectId } = mongoose.Schema;

// Define the UserAccountInformationSchema
const userAccountInformationSchema = new mongoose.Schema({
  nickName: {
    type: String,
    trim: true,
    text: true,
  },
  bio: {
    type: String,
    trim: true,
    text: true,
  },
  jobRole: {
    type: String,
    trim: true,
    text: true,
  },
  workplace: {
    type: String,
    trim: true,
    text: true,
  },
  education: {
    type: String,
    trim: true,
    text: true,
  },
  college: {
    type: String,
    trim: true,
    text: true,
  },
  school: {
    type: String,
    trim: true,
    text: true,
  },
  homeTown: {
    type: String,
    trim: true,
    text: true,
  },
  currentCity: {
    type: String,
    trim: true,
    text: true,
  },
  relationshipStatus: {
    type: String,
    trim: true,
    text: true,
    enum: [
      "Single",
      "In a relationship",
      "Engaged",
      "Married",
      "Divorced",
      "Separated",
      "Widowed",
      "Open relationship",
      "It's complicated",
      "Not specified",
      "Dating",
      "Exclusive",
      "Searching",
      "Taking a break",
    ],
  },
  mobileNumber: {
    type: String,
    trim: true,
    text: true,
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["male", "female", "other"],
  },
  yearOfBirth: {
    type: Number,
    required: true,
    trim: true,
  },
  monthOfBirth: {
    type: Number,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Number,
    required: true,
    trim: true,
  },
  friends: {
    type: Array,
    default: [],
  },
  friendRequests: {
    type: Array,
    default: [],
  },
});

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
  profilePicture: {
    type: String,
    trim: true,
    default: "",
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
  userInformation: userAccountInformationSchema,
});

// Create a UserAccount model using the schema
const UserAccount = mongoose.model("UserAccount", userAccountSchema);

// Export the model for use in other parts of the application
export default UserAccount;
