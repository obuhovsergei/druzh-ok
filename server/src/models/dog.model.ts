import mongoose, { Document } from 'mongoose'
import { IUser } from './user.model'

export interface IDog extends Document {
  name: string
  breed: string
  age: number
  owner: IUser['_id']
}

const dogSchema = new mongoose.Schema<IDog>(
  {
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
)

export const Dog = mongoose.model<IDog>('Dog', dogSchema)
