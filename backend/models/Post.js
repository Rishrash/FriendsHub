import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const postSchema = new mongoose.Schema(
  {
    visibility: {
      type: String,
      enum: ["public", "private", "friends"],
      default: "public",
    },
    textDescription: {
      type: String,
    },
    images: {
      type: Array,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    user: {
      type: ObjectId,
      ref: "UserAccount",
      required: true,
    },
    likes: [
      {
        likeBy: {
          type: ObjectId,
          ref: "UserAccount",
        },
        likeAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    comments: [
      {
        comment: {
          type: String,
        },
        commentBy: {
          type: ObjectId,
          ref: "UserAccount",
        },
        commentAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    reports: [
      {
        reportComment: {
          type: String,
        },
        reportBy: {
          type: ObjectId,
          ref: "UserAccount",
        },
        reportAt: {
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

const Post = mongoose.model("Post", postSchema);

export default Post;
