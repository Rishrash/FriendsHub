import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

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
  search: [{ user: { type: ObjectId, ref: "UserAccount" } }],
});

// Create a UserAccountInformation model using the schema
const UserAccountInformation = mongoose.model(
  "UserAccountInformation",
  userAccountInformationSchema
);

// Export the model for use in other parts of the application
export default UserAccountInformation;
