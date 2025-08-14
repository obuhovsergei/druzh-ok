import { Document } from 'mongoose';
import { IUser } from './user.interface';

export interface IDog extends Document {
  name: string;
  breed: string;
  age: number;
  photos: string[];
  owner: IUser['_id'];
  walkRequests: IWalkRequest[];
}

export interface IWalkRequest {
  walker: string;
  status: 'pending' | 'accepted' | 'completed' | 'rejected';
  date: Date;
  duration: number;
  price: number;
  address: {
    street: string;
    city: string;
    coordinates: [number, number];
  };
  _id?: string;
}
