import mongoose, { Document, Schema } from 'mongoose'

// Define the structure of the user schema
interface User {
  username: string
  email: string
  password: string
}

// Define the user document type extending the User interface and the Document interface provided by Mongoose
export interface UserDocument extends User, Document {}

// Define the schema for the user
const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
  },
  { timestamps: true }
)

// Define and export the User model using the schema
const User =
  mongoose.models.users || mongoose.model<UserDocument>('users', userSchema)

export default User
