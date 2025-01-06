import NextAuth, { CredentialsSignin } from "next-auth"
import GoogleProvider from "next-auth/providers/google" 
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "./models/userModel";
import { connectToDatabase } from "./lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: { /// if u want to use username and password then don't use it but for custom like email use this
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string|undefined;
        const password = credentials?.password as string;

        if (!email || !password) {
            throw new CredentialsSignin("Please provide both email and password");
        }

        // Connection of Database here
        await connectToDatabase();

        const user = await User.findOne({ email }).select("+password");

        if (!user || !user.password) {  // !user.password is for if login with google id 
            throw new CredentialsSignin({cause:"Invalid email or password"});
        }
        
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            throw new CredentialsSignin({cause:"Invalid password"});
        }

        return {
            id: user._id,
            name: user.name,
            email: user.email,
        }

      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
})