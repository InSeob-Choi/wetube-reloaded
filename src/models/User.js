import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  password: {type: String},
  location: String,
  avatarUrl: String,
  socialOnly: {type: Boolean, default: false},
  videos: [{type: mongoose.Schema.Types.ObjectId, ref: "Video"}],
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
})

userSchema.pre("save", async function() {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);
export default User;