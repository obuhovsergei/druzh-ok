export interface IUser {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role?: 'owner' | 'walker';
  address?: {
    street: string;
    city: string;
    coordinates: [number, number];
  };
  pricePerHour?: number;
  rating?: number;
}

export type TLogin = Pick<IUser, "email" | "password">;
