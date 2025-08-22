export interface IUser {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role?: TUserRole;
  address?: {
    street: string;
    city: string;
    coordinates: [number, number];
  };
  pricePerHour?: number;
  rating?: number;
}

export enum TUserRole {
  OWNER = 'owner',
  WALKER = 'walker'
}
