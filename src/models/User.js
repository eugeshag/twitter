import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true },

    avatar: {
      type: String,
      default: "/blank-profile-picture.svg",
    },

    company: {
      department: { type: String },
      companyName: { type: String },
      position: { type: String },
    },

    address: {
      address: { type: String },
      city: { type: String },
      country: { type: String },
    },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
