"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

const loginHandler=async (email: string, password: string) => {
    // Authorize the user
    try {
        await signIn('credentials', {
            email,
            password,
        });
        console.log("Login successful");
    } catch (error) {
        const err= error as CredentialsSignin;
        return err.cause;
    }

}

const GoogleLoginHandler=async () => {
    await signIn('google');
}

export default loginHandler
export {GoogleLoginHandler}