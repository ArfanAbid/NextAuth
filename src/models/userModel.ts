import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password?: string;
    googleId?: string;
}

const userSchema = new mongoose.Schema<IUser>({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        select: false,// whenever we fetch user it will not return password
        // required: true is not required here because we are using sign in with google so it store google id instead of password
    },
    googleId: {
        type: String,
    },
});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password as string, 10);
    next();
})

userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password as string);
}


export const User =mongoose.models?.User ||  mongoose.model<IUser>("User", userSchema); // if already exist then use it otherwise create a new one