import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

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
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  incomingfollowRequests: {
    type: Array,
    default: [],
  },
  sentfollowRequests: {
    type: Array,
    default: [],
  },
});

// Define the userAccountSchema
const userAccountSchema = new mongoose.Schema(
  {
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
    userPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userAccountSchema.statics.signup = async function (
  emailAddress,
  password,
  firstName,
  lastName,
  username,
  role,
  dateOfBirth,
  monthOfBirth,
  yearOfBirth,
  profilePicture
) {
  // validation
  if (
    !emailAddress ||
    !password ||
    !firstName ||
    !lastName ||
    !username ||
    !role ||
    !dateOfBirth ||
    !monthOfBirth ||
    !yearOfBirth
  ) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(emailAddress)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password must be at least 8 characters and include 1 lowercase, 1 uppercase, 1 number, and 1 symbol."
    );
  }

  const isEmailExists = await this.findOne({ emailAddress });
  const isUsernameExists = await this.findOne({ username });
  if (isEmailExists) {
    throw Error("Email already in use");
  }
  if (isUsernameExists) {
    throw Error("Username already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    emailAddress,
    password: hash,
    firstName,
    lastName,
    username,
    role,
    profilePicture,
    userInformation: {
      dateOfBirth,
      monthOfBirth,
      yearOfBirth,
    },
  });

  return user;
};

// static login method
userAccountSchema.statics.login = async function (emailAddress, password) {
  if (!emailAddress || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ emailAddress });
  if (!user) {
    throw Error("Incorrect emailAddress");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

// Create a UserAccount model using the schema
const UserAccount = mongoose.model("UserAccount", userAccountSchema);

export default UserAccount;
