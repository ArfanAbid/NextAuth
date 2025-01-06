"use client";

import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import loginHandler from "@/actions/login";
import { useRouter } from "next/navigation";


const LoginForm = () => {

    const router=useRouter();

    return <form
        action={async (formData) =>{

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if(!email || !password) {
            return toast.error("Please fill all the fields");
        }

        const toastId=toast.loading("Logging in...");
        const error = await loginHandler(email, password);
        if(!error) {
           {
            toast.success("Login successful",{
                id: toastId,
            });
            router.refresh();// refresh the page
           }
        }else{
            toast.error(String(error), {
                id: toastId,
            });
        }

    }}
    className='flex flex-col gap-4'>
    <Input  type='email' placeholder='Email' name='email'/>
    <Input  type='password' placeholder='Password' name='password'/>
    <Button type='submit'>Login</Button>
    </form>
}

export default LoginForm