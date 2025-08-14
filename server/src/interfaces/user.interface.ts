import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'owner' | 'walker';
  address?: {
    street: string;
    city: string;
    coordinates: [number, number]; // [lng, lat]
  };
  pricePerHour?: number; // для выгульщиков
  rating?: number;
  matchPassword(password: string): Promise<boolean>;
}
