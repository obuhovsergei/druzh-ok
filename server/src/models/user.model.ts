import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { IUser } from "@/interfaces/user.interface";

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ['owner', 'walker'], required: true },
    address: {
      street: String,
      city: String,
      coordinates: {
        type: [Number],
        index: '2dsphere'
      }
    },
    pricePerHour: { type: Number, default: 0 }, // для walker
    rating: { type: Number, default: 0, min: 0, max: 5 }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model<IUser>('User', userSchema)
