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


import { CredentialsSignin } from 'next-auth';
import { auth, signIn } from '@/auth';

import LoginForm from '@/components/client/form';
import { redirect } from 'next/navigation';
import { GoogleLoginHandler } from '@/actions/login';



const Page = async () => {

    const session=await auth();
    if(session?.user){
        redirect('/');
    }
    
    return (
        <div className='flex items-center justify-center h-dvh '>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent >

                    <LoginForm />
                
                </CardContent>
                <CardFooter className='flex flex-col gap-2'>
                    <span>OR </span>
                    <form action={GoogleLoginHandler}>
                        <Button type='submit' variant={'outline'}>Login with Google <FaGoogle />
                        </Button>
                    </form>
                    <Link href={'/signup'}>Don't have an account <span className='underline text-blue-600'>Signup</span></Link>
                </CardFooter>
            </Card>

        </div>
    )
}

export default Page