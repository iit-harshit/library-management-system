import { Schema, Document, model, HookNextFunction } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: number;
  roleUpdatedBy: UserDocument["_id"];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: Number,
      require: true,
      default: config.get("role.borrower"),
    },
    roleUpdatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next: HookNextFunction) {
  let user = this as UserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

  const hash = await bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;

  return next();
});

// Used for logging in
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = model<UserDocument>("User", UserSchema);

export default User;
