import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { FaGoogle } from "react-icons/fa";
import Link from 'next/link';

import { User } from '@/models/userModel';
import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/lib/utils';

// Another way but is not convenient to use this way
// using server aswell as client component in same file
// use client component for client side code and server component for server side code as we do in login page


const Page = () => {

    const signUpHandler=async (formData: FormData) => {
        "use server";

        const name = formData.get('name') as string| undefined;
        const email = formData.get('email') as string| undefined;
        const password = formData.get('password') as string| undefined;

        if(!name || !email || !password) {
            throw new Error("Please fill all the fields");
        }

        // Connection of Database here
        await connectToDatabase();

        const user=await User.findOne({email});
        if(user) {
            throw new Error("User already exists");
        }

        //  Create new user
        await User.create({
            name,
            email,
            password,
        })
        
        redirect('/login');

    }

    return (
        <div className='flex items-center justify-center h-dvh '>
            <Card>
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
                </CardHeader>
                <CardContent >
                    <form action={signUpHandler}
                    className='flex flex-col gap-4'>
                    <Input placeholder='Name' name='name'/>
                    <Input  type='email' placeholder='Email' name='email'/>
                    <Input  type='password' placeholder='Password' name='password'/>
                    <Button type='submit'>SignUp</Button>
                    </form>
                </CardContent>
                <CardFooter className='flex flex-col gap-2'>
                    <span>OR </span>
                    <form action="">
                        <Button type='submit' variant={'outline'}>Login with Google <FaGoogle />
                        </Button>
                    </form>
                    <Link href={'/login'}>Already have an account <span className='underline text-blue-600'>Login</span></Link>
                </CardFooter>
            </Card>

        </div>
    )
}


export default Page