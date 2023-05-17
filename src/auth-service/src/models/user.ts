import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  githubId?: string;
  // bitbucketId?: string;
  repositories?: string[];
}


const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  githubId: { type: String },
  // bitbucketId: { type: String },
  repositories: { type: [String] },
});

export const User = mongoose.model<IUser>('User', userSchema);
