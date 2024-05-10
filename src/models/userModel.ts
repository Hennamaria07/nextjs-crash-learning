import { UserType } from "@/utils/modelTypes";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<UserType>({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    VerifiedToken: String,
    verifiedTokenExpiry: Date
});

// Check if the model is already defined, otherwise define it
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
