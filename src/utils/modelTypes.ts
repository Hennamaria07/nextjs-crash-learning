import { Types } from "mongoose";

export interface UserType {
    _id?: Types.ObjectId
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    isAdmin: boolean;
    forgotPasswordToken?: string;
    forgotPasswordExpiry?: Date;
    verifiedToken?: string;
    verifiedTokenExpiry?: Date;
}