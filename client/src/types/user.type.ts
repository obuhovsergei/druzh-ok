import { IUser } from "@/models/user.model";

export type TLogin = Pick<IUser, "email" | "password">;
